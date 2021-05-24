import { Controller, HttpCode, HttpStatus, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    
    @HttpCode(HttpStatus.OK)
    @Get()
    getAllUsers(): Promise<User[]> {
      return this.userService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getUser(@Param('id') id: string): Promise<User> {
      return this.userService.findById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createUser(@Body() createUser: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUser);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    removeUser(@Param('id') id: string): Promise<User> {
        return this.userService.removeUser(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
        return this.userService.updateUser(id, updateUser);
    }
}
