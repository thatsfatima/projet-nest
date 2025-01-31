import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userRegister: RegisterDto) {
    const { username, password, role } = userRegister;
    const roles: Role = role as Role || 'USER' as Role;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new this.userModel({ username, password: hashedPassword, role: roles });
      return await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Le nom d’utilisateur est déjà pris.');
      }
      throw new InternalServerErrorException('Erreur lors de l\'enregistrement de l\'utilisateur.');
    }
  }

  async login(username: string, password: string) {
    try {
      const user = await this.userModel.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Identifiants invalides');
      }

      const credentials = { username: user.username, sub: user._id };
      return {
        access_token: this.jwtService.sign(credentials),
      };
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la connexion.');
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la recherche de l\'utilisateur.');
    }
  }

  async findOne(username: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ username });
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la recherche de l\'utilisateur.');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la recherche des utilisateurs.');
    }
  }

  async logout(token: string) {
    try {
      let tokenPayload = await this.jwtService.verify(token);
      return tokenPayload.expire();
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la deconnexion.');
    }
  }
}