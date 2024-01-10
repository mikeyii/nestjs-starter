import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockId = '1';

  const createUserDto: CreateUserDto = {
    name: 'User #1',
    email: 'user1@email.com',
  };

  const mockUser = {
    _id: mockId,
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
    {
      _id: '3',
      name: 'User #3',
      email: 'user3@email.com',
    },
  ];

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(createUserDto),
    findAll: jest.fn().mockResolvedValue(mockUsers),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    remove: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should create a new User', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockUser);

      await controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of Users', async () => {
      expect(controller.findAll()).resolves.toEqual(mockUsers);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a User', async () => {
      expect(controller.findOne(mockId)).resolves.toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(mockId);
    });
  });

  describe('update()', () => {
    it('should return a User', async () => {
      expect(controller.update(mockId, createUserDto)).resolves.toEqual(
        mockUser,
      );
      expect(service.update).toHaveBeenCalledWith(mockId, createUserDto);
    });
  });

  describe('remove()', () => {
    it('should return a User', async () => {
      expect(controller.remove(mockId)).resolves.toEqual(mockUser);
      expect(service.remove).toHaveBeenCalledWith(mockId);
    });
  });
});
