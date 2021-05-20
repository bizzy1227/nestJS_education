import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from './schemas/post.schema';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}
    
    @HttpCode(HttpStatus.OK)
    @Get()
    getAllPosts(): Promise<Posts[]> {
      return this.postService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getPost(@Param('id') id: string): Object {
      return this.postService.findById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createPost(@Body() createPost: CreatePostDto) {
        return this.postService.createPost(createPost);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    removePost(@Param('id') id: string): string {
        return this.postService.removePost(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    updatePost(@Param('id') id: string, @Body() updatePost: Object) {
        return this.postService.updatePost(id, updatePost);
    }

    @HttpCode(HttpStatus.CREATED)
    @Patch(':idPost/:idComment')
    addCommentToPost(@Param('idPost') idPost: string, @Param('idComment') idComment: string): string {
        return this.postService.addCommentToPost(idPost, idComment);
    }
}
