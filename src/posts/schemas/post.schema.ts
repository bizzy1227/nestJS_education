import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
  _id: string;

  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  author: number;

  @Prop()
  email: string;

  @Prop()
  comments: Array<string>;
}

export const PostSchema = SchemaFactory.createForClass(Posts);