export class CreateCommentDto {
    title: string;

    text: string;

    author: number;

    comments: Array<number>;
}