import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { BookService } from 'src/book/book.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private bookService: BookService,
  ) {}

  async addReview(bookId: string, userId: string, comment: string, rating: number): Promise<Review> {
    try {
      const newReview = new this.reviewModel({ bookId, userId, comment, rating });
      return await newReview.save();
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de l\'ajout de commentaire.');
    }
  }
  
  async getReviewsByBook(bookId: string): Promise<Review[]> {
    const bookExists = await this.bookService.findOne(bookId);
    if (!bookExists) {
      throw new NotFoundException(`Le livre avec l'ID ${bookId} n'existe pas.`);
    }
    try {
      const reviews = await this.reviewModel.find({ bookId }).exec();
      if (!reviews || reviews.length === 0) {
        throw new NotFoundException(`Aucun commentaire trouvé pour le livre avec l'ID ${bookId}.`);
      }
      return reviews;
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la récupération des commentaires.');
    }
  }

}