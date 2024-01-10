import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

const mockUser = {
  _id: '1',
  name: 'User #1',
  email: 'user1@email.com',
};

const mockUsers = [
  {
    _id: '1',
    name: 'User #1',
    email: 'user1@email.com',
  },
  {
    _id: '2',
    name: 'User #2',
    email: 'user2@email.com',
  },
];

const mockRepository = {
  provide: getModelToken('User'),
  useValue: {
    new: jest.fn().mockResolvedValue(mockUser),
    constructor: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn(),
    create: jest.fn(),
    exec: jest.fn(),
    lean: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, mockRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all Users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      lean: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockUsers),
      }),
    } as any);
    const Users = await service.findAll();
    expect(Users).toEqual(mockUsers);
  });

  it('should return a User', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      lean: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      }),
    } as any);
    const User = await service.findOne('1');
    expect(User).toEqual(mockUser);
  });

  it('should update a User', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      lean: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      }),
    } as any);
    const user = await service.update('1', {
      name: 'User #1',
      email: 'user1@email.com',
    });
    expect(user).toEqual(mockUser);
  });

  it('should delete a User', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      lean: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      }),
    } as any);
    const user = await service.remove('1');
    expect(user).toEqual(mockUser);
  });

  it('should insert a new User', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockUser as any));
    const newUser = await service.create({
      name: 'User #1',
      email: 'user1@email.com',
    });
    expect(newUser).toEqual(mockUser);
  });
});
