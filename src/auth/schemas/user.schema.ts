import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document & { __v: number };
export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
  }

export interface User {
  username: string;
  password: string;
  role: Role;
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Role.USER })
  role: Role = Role.USER;
}

export const UserSchema = SchemaFactory.createForClass(User);