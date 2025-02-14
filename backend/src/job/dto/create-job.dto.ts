import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  salary?: number | undefined;

  @IsNotEmpty()
  @IsNumber()
  userId: number | string; // Foreign key linking to User model
}
