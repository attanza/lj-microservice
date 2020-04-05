import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IProduct, IUser } from './referral.interface';

export class CreateReferralDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsArray()
  products?: IProduct[];

  @IsNotEmpty()
  @IsObject()
  creator: IUser;

  @IsOptional()
  @IsInt()
  maxConsumer?: number;

  @IsOptional()
  @IsArray()
  consumer?: IUser[];

  @IsNotEmpty()
  @IsDateString()
  validUntil: Date;
}

export class UpdateReferralDto {
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
  @IsInt()
  maxConsumer: number;

  @IsOptional()
  @IsArray()
  consumer: IUser[];

  @IsOptional()
  @IsDateString()
  validUntil: Date;

  @IsOptional()
  @IsBoolean()
  isExpired: boolean;
}

export class CreateBulkReferralDto {
  @IsNotEmpty()
  referrals: CreateReferralDto[];
}
