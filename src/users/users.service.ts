import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.model.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.model.find().lean().exec();
  }

  async findOne(id: string): Promise<User> {
    const result = await this.model.findById(id).lean().exec();
    if (!result) throw new NotFoundException();
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.model
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .lean()
      .exec();
    if (!result) throw new NotFoundException();
    return result;
  }

  async remove(id: string): Promise<User> {
    const result = await this.model.findByIdAndDelete(id).lean().exec();
    if (!result) throw new NotFoundException();
    return result;
  }
}
