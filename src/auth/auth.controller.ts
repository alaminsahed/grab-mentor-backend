import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('employIdImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        mobile: { type: 'string' },
        password: { type: 'string' },
        address: { type: 'string' },
        company: { type: 'string' },
        role: { type: 'string', enum: ['admin', 'user', 'tutor'] },
        companyDesignation: { type: 'string' },
        expertArea: { type: 'string' },
        coreSkill: { type: 'string' },
        employId: { type: 'string' },
        companyWebsite: { type: 'string' },
        companyAddress: { type: 'string' },
        employIdImage: {
          type: 'string',
          format: 'binary',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
        status: { type: 'string', enum: ['active', 'inactive', 'blocked'] },
      },
      required: ['name', 'email', 'mobile', 'address', 'role', 'password'],
    },
  })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.authService.register(createUserDto, file?.path);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({ status: 201, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
