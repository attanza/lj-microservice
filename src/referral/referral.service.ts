import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Validator } from 'class-validator';
import moment from 'moment';
import { Model } from 'mongoose';
import { ResourcePaginationPipe } from 'src/shared/pipes/resource-pagination.pipe';
import getApiCollection from '../helpers/getApiCollection';
import { IApiCollection } from '../shared/interfaces/response-parser.interface';
import {
  CreateBulkReferralDto,
  CreateReferralDto,
  UpdateReferralDto,
} from './referral.dto';
import { IReferral } from './referral.interface';
@Injectable()
export class ReferralService {
  validator: any;
  constructor(
    @InjectModel('Referral') private referralModel: Model<IReferral>,
  ) {
    this.validator = new Validator();
  }

  async index(query: ResourcePaginationPipe): Promise<IApiCollection> {
    const regexSearchable = ['code', 'consumer.email', 'creator.email'];
    const keyValueSearchable = [
      'code',
      'maxConsumer',
      'isExpired',
      'creator.id',
    ];
    return await getApiCollection(
      'Referral',
      this.referralModel,
      query,
      regexSearchable,
      keyValueSearchable,
    );
  }

  async show(id: string): Promise<IReferral> {
    const data = await this.getById(id);
    if (!data) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async store(referralDto: CreateReferralDto): Promise<IReferral> {
    const { code } = referralDto;
    const found = await this.referralModel.findOne({ code, isExpired: false });
    if (found) {
      throw new HttpException(
        'Referral code already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newData = new this.referralModel(referralDto);
    await newData.save();
    return newData;
  }

  async bulkStore(referralDto: CreateBulkReferralDto) {
    return this.referralModel.insertMany(referralDto.referrals);
  }

  async update(
    id: string,
    referralDto: Partial<UpdateReferralDto>,
  ): Promise<IReferral> {
    const data = await this.getById(id);
    if (
      data.maxConsumer > 0 &&
      referralDto.consumer &&
      referralDto.consumer.length > data.maxConsumer
    ) {
      throw new HttpException('Consumer is over limit', HttpStatus.BAD_REQUEST);
    }
    Object.keys(referralDto).map(key => (data[key] = referralDto[key]));
    await data.save();
    await this.checkExpiry(data);
    return data;
  }

  async destroy(id: string): Promise<string> {
    await this.referralModel.deleteOne({ _id: id });
    return 'Data Deleted';
  }

  private async getById(id: string): Promise<IReferral> {
    let data: IReferral;
    if (this.validator.isMongoId(id)) {
      data = await this.referralModel.findById(id);
    } else {
      data = await this.referralModel.findOne({ code: id });
    }
    if (data) {
      data = await this.checkExpiry(data);
    }
    return data;
  }

  private async checkExpiry(data: IReferral): Promise<IReferral> {
    if (!data.isExpired) {
      const now = moment();
      const expiry = moment(data.validUntil);
      if (now >= expiry) {
        data.isExpired = true;
      }
      if (data.maxConsumer && data.maxConsumer !== 0 && data.consumer) {
        if (data.consumer.length >= data.maxConsumer) {
          data.isExpired = true;
        }
      }
      await data.save();
    }
    return data;
  }

  async checkExist(id: string): Promise<boolean> {
    let found: IReferral;
    found = await this.getById(id);
    if (!found) {
      return false;
    }
    if (found.isExpired) {
      return false;
    }
    return true;
  }

  async checkReferrals(key: string, value: any[]): Promise<IReferral[]> {
    return this.referralModel.find({ [key]: { $in: value } }).lean();
  }

  async getByCode(code: string): Promise<IReferral> {
    return await this.referralModel.findOne({ code }).lean();
  }

  async truncate() {
    await this.referralModel.deleteMany({});
  }
}
