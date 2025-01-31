import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { getModelToken } from '@nestjs/mongoose';

describe('BookService', () => {
  let bookService: BookService;

  const mockBookModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken('Book'),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
  });

  it('Creation de livre', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Livre',
      author: 'Auteur',
      publishedDate: new Date(),
      category: 'Categorie',
    };

    mockBookModel.create.mockResolvedValue({
      _id: '123',
      ...createBookDto,
      __v: 0,
    });

    const result = await bookService.create(createBookDto);
    expect(result).toEqual({
      _id: '123',
      ...createBookDto,
      __v: 0,
    });
    expect(mockBookModel.create).toHaveBeenCalledWith(createBookDto);
  });
});