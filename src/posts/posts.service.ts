import { Injectable, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument, Posts } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService,
        private readonly commentsService: CommentsService,
        @InjectModel(Post.name) private postModel: Model<PostDocument>
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

    findAll(): Promise<Posts[]> {;
        return this.postModel.find().exec();
    }

    findById(id: string): Object {
        const commentsForPost: Array<{}> = [];
        const post = Object.assign({}, this.posts.find((item: any) => item.id === +id));
        post.author = this.usersService.findById(String(post.author));
        post.comments.map(commentId => {
            commentsForPost.push(this.commentsService.findById(commentId));
        })
        post.comments = commentsForPost;
        return post;
    }

    createPost(createPost: CreatePostDto) {
        const createdPost = new this.postModel(createPost);
        return createdPost.save();
    }

    updatePost(id: string, updatePost): string {
        this.posts.map(post => {
            if (post.id === +id) {
                post.text = updatePost.text
            }
        })
        return 'Post updated';
    }

    removePost(id: string): string {
        const postIndex = this.posts.findIndex((item: any) => item.id === +id);
        if (postIndex >= 0) {
          this.posts.splice(postIndex, 1);
        }
        return 'Post deleted';
    }

    addCommentToPost(idPost: string, idComment: string) {
        const post = this.posts.find(item => item.id === +idPost);
        post.comments.push(+idComment);
        return 'Comment added';
    }
}
