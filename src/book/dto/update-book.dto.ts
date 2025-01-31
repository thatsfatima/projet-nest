import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsOptional()
  @IsString({ message: 'Le titre doit être une chaîne de caractères.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'L\'auteur doit être une chaîne de caractères.' })
  author: string;

  @IsOptional()
  @IsDateString()
  publishedDate?: Date;

  @IsOptional()
  @IsString({ message: 'La catégorie doit être une chaîne de caractères.' })
  category?: string;

}