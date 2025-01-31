import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('ReviewService', () => {
  let reviewService: ReviewService;

  const mockReviewModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getModelToken('Review'),
          useValue: mockReviewModel,
        },
      ],
    }).compile();

    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('Creation de commentaire', async () => {
    const review = {
        bookId: '123',
        userId: '1234',
        comment: 'Good job!',
        rating: 5,
    };

    mockReviewModel.create.mockResolvedValue({
      _id: 'mockedReviewId',
      ...review,
      __v: 0,
    });

    const { bookId, userId, comment, rating } = review;
    const result = await reviewService.addReview(bookId, userId, comment, rating );
    expect(result).toEqual({
      _id: 'mockedReviewId',
      ...review,
      __v: 0,
    });
    expect(mockReviewModel.create).toHaveBeenCalledWith(review);
  });
});