import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Role } from '../../enums/role.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsMobilePhone()
  mobile: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  companyDesignation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  expertArea?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coreSkill?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  employId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  companyWebsite?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  companyAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  employIdImage?: string;
}
