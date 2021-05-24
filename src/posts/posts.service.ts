import { Injectable, Optional, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument, Posts } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { async } from 'rxjs';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService,
        private readonly commentsService: CommentsService,
        @InjectModel(Posts.name) private postModel: Model<PostDocument>
    ) {

    }

    async findAll(): Promise<Posts[]> {
        const getPosts = await this.postModel.find().exec();
        for (const post of getPosts) {
            const comments = [];
            for (const commentId of post.comments) {
                comments.push(await this.commentsService.findById(commentId.toString()));
            }
            post.comments = comments;
        }
        return getPosts;
    }

    async findById(id: string): Promise<Posts> {
        const post = await this.postModel.findById(id);
        const comments = [];
        for (const commentId of post.comments) {
            comments.push(await this.commentsService.findById(commentId.toString()));
        }
        post.comments = comments;
        return post;
    }

    async createPost(createPost: CreatePostDto): Promise<Posts> {
        const createdPost = new this.postModel(createPost);
        return createdPost.save();
    }

    async updatePost(id: string, updatePost: UpdatePostDto): Promise<Posts> {
        return this.postModel.findByIdAndUpdate(id, updatePost);

    }

    async removePost(id: string): Promise<Posts> {
        return this.postModel.findByIdAndRemove(id);
    }

    async addCommentToPost(idPost: string, createComment: CreateCommentDto) {
        const newComment = await this.commentsService.createComment(createComment);
        const targetPost = await this.postModel.findById(idPost);
        targetPost.comments.push(newComment._id);
        return targetPost.save();
    }
}
