import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
    private posts = [
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

    findAll(): Array<{}> {
        return this.posts;
    }

    findById(id: string): Object {
        return this.posts.find((item: any) => item.id === +id);
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
