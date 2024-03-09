import { Injectable } from '@nestjs/common';

//  imports for User
import { UserDto } from './user.dto/user.dto';
import { User } from './schema/user.schema';

//  imports for Mongoose
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Mongoose.Model<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findUser(numphone: string): Promise<User | null> {
    const user = await this.userModel.findOne({ phone: numphone }).exec();
    return user ? user : null;
  }

  async createUser(userdata: UserDto): Promise<User> {
    const res = await this.userModel.create(userdata);
    return res;
  }

  async deleteUser(phone: string) {
    await this.userModel.findOneAndDelete({ phone: `${phone}` });
  }

  async updateUser(phone: string, data: UserDto): Promise<User> {
    const updateUser = await this.userModel.findOneAndUpdate({ phone }, data, {
      new: true,
      runValidators: true,
    });
    return updateUser;
  }
}
