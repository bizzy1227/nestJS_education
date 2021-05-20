import { Controller, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getAllComments(): Array<{}> {
      return this.commentsService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getComment(@Param('id') id: string): Object {
      return this.commentsService.findById(id);
    }
}
