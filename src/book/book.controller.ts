import { Controller, Get, Post, Body, Param, Query, Patch, Delete, InternalServerErrorException, NotFoundException, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { getPagination } from 'src/common/utils/pagination.util';
import { ApiTags, ApiResponse, ApiQuery, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateBookDto, required: true, description: '{\n "title": "",\n "author": "",\n "publishedDate": "",\n "category": "" \n}' })
  @ApiResponse({ status: 201, description: 'Livre créé avec succès.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur interne.' })
  async create(@Body() createBookDto: CreateBookDto) {
    try {
      return await this.booksService.create(createBookDto);
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la création du livre.');
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retourne une liste de livres.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur interne.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numéro de page pour la pagination.' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page.' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Champ par lequel trier les livres.' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Ordre de tri.' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    try {
      page = page || 1;
      limit = limit || 10;
      sortBy = sortBy || 'title';
      order = order || 'asc';
      const pagination = getPagination(page, limit);
      const result = await this.booksService.findAll(pagination.skip, pagination.limit, sortBy, order);
      return {
        data: result.books,
        total: result.total,
        page,
        limit,
      };
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la récupération des livres.');
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Retourne le livre avec l\'ID spécifié.' })
  @ApiResponse({ status: 404, description: 'Livre non trouvé.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur interne.' })
  async findOne(@Param('id') id: string) {
    try {
      const book = await this.booksService.findOne(id);
      return book;
    } catch (error) {
      throw new NotFoundException(`Le livre avec l'ID ${id} n'existe pas.`);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateBookDto, required: true, description: '{\n "title": "",\n "author": "",\n "publishedDate": "",\n "category": "" \n}' })
  @ApiResponse({ status: 200, description: 'Livre mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Livre non trouvé.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur interne.' })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      const updatedBook = await this.booksService.update(id, updateBookDto);
      return updatedBook;
    } catch (error) {
      throw new NotFoundException(`Erreur lors de la mise à jour du livre avec l'ID ${id}.`);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 204, description: 'Livre supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Livre non trouvé.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur interne.' })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const isAdmin = JwtAuthGuard.isAdmin(req.headers['authorization']);
    
    if (!isAdmin) {
      throw new UnauthorizedException('Vous n\'avez pas les droits nécessaires pour supprimer ce livre.');
    }

    try {
      await this.booksService.remove(id);
      return;
    } catch (error) {
      throw new NotFoundException(`Erreur lors de la suppression du livre avec l'ID ${id}.`);
    }
  }

}