import { IsNotEmpty, IsOptional, IsString, IsDateString, IsIn } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Le titre est requis.' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères.' })
  title: string;

  @IsNotEmpty({ message: 'L\'auteur est requis.' })
  @IsString({ message: 'L\'auteur doit être une chaîne de caractères.' })
  author: string;

  @IsOptional()
  @IsDateString()
  publishedDate?: Date;

  @IsOptional()
  @IsString({ message: 'La catégorie doit être une chaîne de caractères.' })
  category?: string;
  
}