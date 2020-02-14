import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import getApiCollection from '../helpers/getApiCollection';
import { IApiCollection } from '../shared/interfaces/response-parser.interface';
import { ResourcePaginationPipe } from '../shared/pipes/resource-pagination.pipe';
import { CreateActivityDto } from './activity.dto';
import { IActivity } from './activity.interface';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel('Activity') private activityModel: Model<IActivity>,
  ) {}

  async index(query: ResourcePaginationPipe): Promise<IApiCollection> {
    const regexSearchable = ['ip', 'browser', 'activity', 'user.email'];
    const keyValueSearchable = ['user.id'];
    return await getApiCollection(
      'Activity',
      this.activityModel,
      query,
      regexSearchable,
      keyValueSearchable,
    );
  }

  async show(id: string): Promise<IActivity> {
    const data = await this.getById(id);
    return data;
  }

  async store(activityDto: CreateActivityDto): Promise<IActivity> {
    const newData = new this.activityModel(activityDto);
    await newData.save();
    return newData;
  }

  private async getById(id: string): Promise<IActivity> {
    const found = await this.activityModel.findById(id);
    if (!found) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }
}
