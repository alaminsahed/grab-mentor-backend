import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UsersService } from './users.service';
import { User } from 'src/auth/entities/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Retrieve a list of all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of users.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can access this endpoint.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The user ID',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can access this endpoint.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update user details' })
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async update(
    @Param('id') id: number,
    @Body() UserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, UserDto);
  }
}
