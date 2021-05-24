import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
    ) {

    }

    async findAll(): Promise<Comment[]> {
        return this.commentModel.find().exec();
    }

    async findById(id: string): Promise<Comment> {
        return this.commentModel.findById(id);
    }

    async createComment(createComment: CreateCommentDto): Promise<Comment> {
        const createdComment = new this.commentModel(createComment);
        return createdComment.save();
    }
}
