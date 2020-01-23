import { IsArray, IsDate, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IProduct, IUser } from './referral.interface';

export class CreateRefferalDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsArray()
  products: IProduct[];

  @IsNotEmpty()
  @IsObject()
  creator: IUser;

  @IsNotEmpty()
  @IsDate()
  validUntil: Date;
}

export class UpdateRefferalDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsArray()
  products: IProduct[];

  @IsOptional()
  @IsObject()
  creator: IUser;

  @IsOptional()
  @IsArray()
  consumer: IUser[];

  @IsOptional()
  @IsDate()
  validUntil: Date;
}
