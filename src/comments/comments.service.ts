import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {

    private comments: any = [
        {
            id: 1,
            text: 'Comments 1'
        },
        {
            id: 2,
            text: 'Comments 2'
        },
        {
            id: 3,
            text: 'Comments 3'
        },
        {
            id: 4,
            text: 'Comments 4'
        },
        {
            id: 5,
            text: 'Comments 5'
        },
    ]

    findAll(commentsIds: Array<number>): Array<{}> {
        const newPosts: Array<{}> = [];
        commentsIds.forEach(id => {
            newPosts.push(this.comments.find(item => item.id === id))
        })
        return newPosts;
    }

    findById(id: string): Object {
        return this.comments.find((item: any) => item.id === +id);
    }
}
