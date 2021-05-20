export class CreatePostDto {
    title: string;

    text: string;

    author: number;

    comments: Array<number>;
}