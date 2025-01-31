import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET as string || 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL || ''),
    BookModule, AuthModule, ReviewModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}