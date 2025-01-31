import { IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
  
  @IsOptional()
  @IsString()
  role?: string;
  
}