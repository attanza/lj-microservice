import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Model } from 'mongoose';
import { ResourcePaginationPipe } from 'src/shared/pipes/resource-pagination.pipe';
import getApiCollection from '../helpers/getApiCollection';
import { IApiCollection } from '../shared/interfaces/response-parser.interface';
import { CreateRefferalDto, UpdateRefferalDto } from './referral.dto';
import { IRefferal } from './referral.interface';
@Injectable()
export class ReferralService {
  constructor(
    @InjectModel('Refferal') private refferalModel: Model<IRefferal>,
  ) {}

  async index(query: ResourcePaginationPipe): Promise<IApiCollection> {
    const regexSearchable = ['code'];
    const keyValueSearchable = ['code', 'maxConsumer', 'isExpired'];
    return await getApiCollection(
      'Referral',
      this.refferalModel,
      query,
      regexSearchable,
      keyValueSearchable,
    );
  }

  async show(id: string): Promise<IRefferal> {
    const data = await this.getById(id);
    await this.checkExpiry(data);
    return data;
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
    if (referalDto.consumer.length > data.maxConsumer) {
      throw new HttpException('Consumer is over limit', HttpStatus.BAD_REQUEST);
    }
    Object.keys(referalDto).map(key => (data[key] = referalDto[key]));
    await this.checkExpiry(data);
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

  private async checkExpiry(data: IRefferal): Promise<IRefferal> {
    if (!data.isExpired) {
      const now = moment();
      const expiry = moment(data.validUntil);
      if (now >= expiry) {
        data.isExpired = true;
      }
      if (data.consumer.length >= data.maxConsumer) {
        data.isExpired = true;
      }
    }
    await data.save();
    return data;
  }
}
