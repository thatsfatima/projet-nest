import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Review } from 'src/review/schemas/review.schema';

export type BookDocument = Book & Document;

@Schema({
    timestamps: true,
})
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  publishedDate?: Date;

  @Prop()
  category?: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ 
    type: Array<Review>,
    ref: 'Review',
    default: []
  })
  reviews: Review[];

}
export const BookSchema = SchemaFactory.createForClass(Book);