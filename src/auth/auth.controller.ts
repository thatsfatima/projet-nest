import { Controller, Post, Body, InternalServerErrorException, ConflictException, Query, Get, Param, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto, required: true, description: '{\n "username": "",\n "password": "",\n "role": "" \n}' })
  @ApiResponse({ status: 201, description: 'User ajouté avec succès.' })
  @ApiResponse({ status: 409, description: 'Le username existe déjà.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async register(@Body() userRegister: RegisterDto) {
    const { username, password, role } = userRegister;
    const user = await this.authService.findOne(username);
    if (user) {
      throw new ConflictException('Le nom d’utilisateur est déjà pris.');
    }
    try {
      return await this.authService.register(userRegister);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Le nom d’utilisateur est déjà pris.');
      }
      throw new InternalServerErrorException('Erreur lors de l\'enregistrement de l\'utilisateur.');
    }
  }

  @Post('login')
  @ApiBody({ type: LoginDto, required: true, description: '{\n "username": "",\n "password": "" \n}' })
  @ApiResponse({ status: 200, description: 'User connecté avec succès.' })
  @ApiResponse({ status: 401, description: 'Identifiants incorrects.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async login(@Body() userLogin: LoginDto) {
    const { username, password } = userLogin;
    try {
      return await this.authService.login(username, password);
    } catch (error) {
      if (error.message === 'Identifiants invalides') {
        throw new UnauthorizedException('Identifiants invalides');
      }
      throw new InternalServerErrorException('Erreur lors de la connexion.');
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async findById(@Param('id') id: string) {
    try {
      return await this.authService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la recherche des utilisateurs.');
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async findAll() {
    try {
      return await this.authService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la recherche des utilisateurs.');
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Utilisateur d&eacute;connect&eacute; avec succ&egrave;s.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async logout(@Req() req: Request) {
    try {
      return await this.authService.logout(req.headers['authorization']);
    }
    catch (error) {
      throw new InternalServerErrorException('Erreur lors de la deconnexion.');
    }
  }
}