import { IsIP, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { IUser } from '../referral/referral.interface';
export class CreateActivityDto {
  @IsNotEmpty()
  @IsObject()
  user: IUser;

  @IsNotEmpty()
  @IsIP()
  ip: string;

  @IsNotEmpty()
  @IsString()
  browser: string;

  @IsNotEmpty()
  @IsString()
  activity: string;
}
