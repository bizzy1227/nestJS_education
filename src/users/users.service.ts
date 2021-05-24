import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {
        
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<User>  {
        return this.userModel.findById(id);
    }

    async createUser(createUser: CreateUserDto): Promise<User> {
        const newUser = new this.userModel({
            name: createUser.name,
            email: createUser.email
        });
        return newUser.save();
    }

    async updateUser(id: string, updateUser: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updateUser);
    }

    async removeUser(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id);
    }

    async getCurrentUser(): Promise<User> {
        const users = await this.userModel.find().exec();
        return users[Math.floor(Math.random() * users.length)]._id;
    }
}
