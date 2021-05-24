import { Module, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Posts } from './schemas/post.schema';
import { CommentSchema, Comment } from 'src/comments/schemas/comment.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [PostsService, UsersService, CommentsService],
  controllers: [PostsController]
})
export class PostsModule {}
