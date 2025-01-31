import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Role, UserDocument } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<UserDocument>;

  const mockUserModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<UserDocument>>(getModelToken('User'));
  });

  it('ENregistrement de User', async () => {
    const createUserDto: RegisterDto = {
      username: 'Username',
      password: 'Passer',
      role: Role.USER,
    };

    mockUserModel.create.mockResolvedValue({
      _id: '1234',
      username: createUserDto.username,
      password: createUserDto.password,
      role: createUserDto.role,
      __v: 0,
    });

    const result = await authService.register(createUserDto);
    expect(result).toEqual({
      _id: '1234',
      username: createUserDto.username,
      password: createUserDto.password,
      role: createUserDto.role,
      __v: 0,
    });
    expect(mockUserModel.create).toHaveBeenCalledWith({
      username: createUserDto.username,
      password: createUserDto.password,
      role: createUserDto.role,
    });
  });
});