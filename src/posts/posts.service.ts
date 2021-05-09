import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService
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

    findAll(): any {
        const posts: Array<{}> = [];
        this.posts.map(post => {
            posts.push(
                {   
                    id: post.id,
                    title: post.title,
                    text: post.text,
                    author: this.usersService.findById(String(post.author)),
                    comments: post.comments
                }
            )
        });
        return posts;
    }

    findById(id: string): Object {
        const post = Object.assign({}, this.posts.find((item: any) => item.id === +id));
        post.author = this.usersService.findById(String(post.author));
        return post;
    }

    createPost(createPost): string {
        const newPost = {
            id: Date.now(),
            title: `Post ${this.posts.length + 1}`,
            text: `${createPost.text}, id: ${Date.now()}`,
            author: 3,
            comments: []
        }
        this.posts.push(newPost);
        return 'Post created';
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

    addCommentToPost() {

    }
}
