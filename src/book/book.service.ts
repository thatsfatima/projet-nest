import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async findAll(skip: number, limit: number, sortBy: string, order: 'asc' | 'desc') {
    try {
      const books = await this.bookModel
        .find()
        .populate('reviews')
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit) as Book[];
        
      const total = await this.bookModel.countDocuments();
      return { books, total };
    } catch (error) {
      throw new NotFoundException('Erreur lors de la récupération des livres');
    }
  }

  async findOne(id: string): Promise<Book> {
    try {
      const book = await this.bookModel.findById(id).populate('reviews');
      if (!book) {
        throw new NotFoundException(`Le livre avec l'ID ${id} n'existe pas`);
      }
      return book;
    } catch (error) {
      throw new NotFoundException(`Erreur lors de la récupération du livre avec l'ID ${id}`);
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });
    if (!updatedBook) throw new NotFoundException(`Le livre ${id} n'existe pas`);
    return updatedBook;
  }

  async remove(id: string): Promise<Book> {
    const result = await this.bookModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Le livre ${id} n'existe pas`);
    return result || null;
  }
  
}