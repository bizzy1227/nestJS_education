export class CreateCommentDto {
    readonly title: string;

    readonly text: string;

    readonly author: number;

    readonly comments: Array<number>;
}