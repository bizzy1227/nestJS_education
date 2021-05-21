import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreatePostDto {

    @IsString()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly text: string;

    @IsNumber()
    readonly author: number;

    @IsString()
    @IsEmail()
    readonly email: string;

    @IsArray()
    readonly comments: Array<number>;


}