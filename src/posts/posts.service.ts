import { Injectable, Optional, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument, Posts } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService,
        private readonly commentsService: CommentsService,
        @InjectModel(Posts.name) private postModel: Model<PostDocument>
    ) {

    }

    private posts: any = [
        {
            id: 1,
            title: 'Post 1',
            text: 'Test description',
            author: 3,
            comments: [1,2]
        },
        {
            id: 2,
            title: 'Post 2',
            text: 'Test description 2',
            author: 1,
            comments: [3,4]
        },
        {
            id: 3,
            title: 'Post 3',
            text: 'Test description 3',
            author: 2,
            comments: []
        }
    ]

    async findAll(): Promise<Posts[]> {;
        return this.postModel.find().exec();
    }

    async findById(id: string): Promise<Posts> {
        return this.postModel.findById(id);
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

    addCommentToPost(idPost: string, idComment: string) {
        const post = this.posts.find(item => item.id === +idPost);
        post.comments.push(+idComment);
        return 'Comment added';
    }
}
