import { Controller, Post, Get, Body, Param, InternalServerErrorException, NotFoundException, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { BookService } from 'src/book/book.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewsService: ReviewService,
    private bookService: BookService,
    private authService: AuthService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'Commentaire ajouté avec succès.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur interne.' })
  async addReview(@Query('bookId') bookId: string, @Query('userId') userId: string, @Query('comment') comment: string, @Query('rating') rating: number) {
    // const userId = JwtAuthGuard.getUserId(req.headers['authorization']);
    const bookExists = await this.bookService.findOne(bookId);
    if (!bookExists) {
      throw new NotFoundException(`Le livre avec l'ID ${bookId} n'existe pas.`);
    }
    const userExists = await this.authService.findById(userId);
    if (!userExists) {
      throw new NotFoundException(`L'utilisateur avec l'ID ${userId} n'existe pas.`);
    }
    try {
      return await this.reviewsService.addReview(bookId, userId, comment, rating);
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de l\'ajout du commentaire.');
    }
  }

  @Get(':bookId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Commentaires du livre trouvés avec succès.' })
  @ApiResponse({ status: 404, description: 'Pas de commentaires pour ce livre.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur interne.' })
  async getReviewsByBook(@Param('bookId') bookId: string) {
    try {
      const reviews = await this.reviewsService.getReviewsByBook(bookId);
      if (!reviews || reviews.length === 0) {
        throw new NotFoundException(`Aucun commentaire trouvé pour le livre avec l'ID ${bookId}.`);
      }
      return reviews;
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la récupération des commentaires.');
    }
  }
}