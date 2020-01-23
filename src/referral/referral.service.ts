import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import getApiCollection from '../helpers/getApiCollection';
import { ResourcePagination } from '../shared/interfaces/resource-pagination.interface';
import { IApiCollection } from '../shared/interfaces/response-parser.interface';
import { CreateRefferalDto, UpdateRefferalDto } from './referral.dto';
import { IRefferal } from './referral.interface';

@Injectable()
export class ReferralService {
  constructor(
    @InjectModel('Refferal') private refferalModel: Model<IRefferal>,
  ) {}

  async index(query: ResourcePagination): Promise<IApiCollection> {
    const searchable = ['code'];
    return await getApiCollection(
      'Referral',
      this.refferalModel,
      query,
      searchable,
    );
  }
  async show(id: string): Promise<IRefferal> {
    return this.getById(id);
  }
  async store(referalDto: CreateRefferalDto): Promise<IRefferal> {
    const { code } = referalDto;
    const found = await this.refferalModel.findOne({ code, isExpired: false });
    if (found) {
      throw new HttpException(
        'Referral code already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newData = new this.refferalModel(referalDto);
    await newData.save();
    return newData;
  }
  async update(
    id: string,
    referalDto: Partial<UpdateRefferalDto>,
  ): Promise<IRefferal> {
    const data = await this.getById(id);
    Object.keys(referalDto).map(key => (data[key] = referalDto[key]));
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
