import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { apiCreated, apiItem } from '../helpers/responseParser';
import {
  IApiCollection,
  IApiItem,
} from '../shared/interfaces/response-parser.interface';
import { MongoIdPipe } from '../shared/pipes/mongoId.pipe';
import { ResourcePaginationPipe } from '../shared/pipes/resource-pagination.pipe';
import { CreateActivityDto } from './activity.dto';
import { ActivityService } from './activity.service';

@Controller('api/activities')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async index(@Query() query: ResourcePaginationPipe): Promise<IApiCollection> {
    return this.activityService.index(query);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async show(@Param() param: MongoIdPipe): Promise<IApiItem> {
    const { id } = param;
    const data = await this.activityService.show(id);
    return apiItem('Activity', data);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(@Body() refferalDto: CreateActivityDto): Promise<IApiItem> {
    const data = await this.activityService.store(refferalDto);
    return apiCreated('Activity', data);
  }
}
