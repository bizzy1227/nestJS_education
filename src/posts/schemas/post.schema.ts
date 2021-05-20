import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  author: number;

  @Prop()
  comments: Array<number>;
}

export const PostSchema = SchemaFactory.createForClass(Posts);