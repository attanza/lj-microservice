import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRefferalDto, UpdateRefferalDto } from './referral.dto';
import { IRefferal } from './referral.interface';

@Injectable()
export class ReferralService {
  constructor(
    @InjectModel('Refferal') private refferalModel: Model<IRefferal>,
  ) {}

  async index(): Promise<IRefferal[]> {
    return this.refferalModel.find();
  }
  async show(id: string): Promise<IRefferal> {
    return this.getById(id);
  }
  async store(referalDto: CreateRefferalDto): Promise<IRefferal> {
    const newData = new this.refferalModel(referalDto);
    await newData.save();
    return newData;
  }
  async update(id: string, referalDto: UpdateRefferalDto): Promise<IRefferal> {
    const data = await this.getById(id);
    data.update(referalDto);
    await data.save();
    return data;
  }
  async destroy(id: string): Promise<string> {
    const data = await this.getById(id);
    await data.remove();
    return 'Data Deleted';
  }

  private async getById(id: string): Promise<IRefferal> {
    const found = await this.refferalModel.findById(id);
    if (!found) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }
}
