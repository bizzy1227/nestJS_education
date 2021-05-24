import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  _id: any;

  @Prop()
  text: string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);