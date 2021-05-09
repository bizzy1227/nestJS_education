import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  providers: [PostsService, UsersService, CommentsService],
  controllers: [PostsController]
})
export class PostsModule {}
