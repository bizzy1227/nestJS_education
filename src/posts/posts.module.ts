import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [PostsService, UsersService],
  controllers: [PostsController]
})
export class PostsModule {}
