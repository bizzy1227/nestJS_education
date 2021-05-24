import { Controller, HttpCode, HttpStatus, Get, Param, Body, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getAllComments() {
      return this.commentsService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getComment(@Param('id') id: string): Object {
      return this.commentsService.findById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createComment(@Body() createComment: CreateCommentDto) {
      return this.commentsService.createComment(createComment);
    }
}
