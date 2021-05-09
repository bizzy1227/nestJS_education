import { Controller, HttpCode, HttpStatus, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    
    @HttpCode(HttpStatus.OK)
    @Get()
    getAllUsers(): Array<{}> {
      return this.userService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getUser(@Param('id') id: string): Object {
      return this.userService.findById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createUser(@Body() createUser: Object): string {
        return this.userService.createUser(createUser);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    removeUser(@Param('id') id: string): string {
        return this.userService.removeUser(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUser: Object) {
        return this.userService.updateUser(id, updateUser);
    }
}
