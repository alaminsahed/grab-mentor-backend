import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enums/role.enum';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(2, 100)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsMobilePhone()
  mobile: string;

  @Column()
  @IsString()
  address: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  company?: string;

  @Column({ type: 'enum', enum: Role })
  @IsEnum(Role)
  role: Role;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  companyDesignation?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  expertArea?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  coreSkill?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  employId?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  companyWebsite?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  companyAddress?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  employIdImage?: string;
}
