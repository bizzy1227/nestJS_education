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

    findAll(): Array<{}> {
        return this.comments;
    }

    findById(id: string): Object {
        return this.comments.find((item: any) => item.id === +id);
    }
}
