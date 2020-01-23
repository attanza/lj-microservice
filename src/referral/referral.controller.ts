import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  apiCreated,
  apiDeleted,
  apiItem,
  apiUpdated,
} from '../helpers/responseParser';
import {
  IApiCollection,
  IApiItem,
} from '../shared/interfaces/response-parser.interface';
import { MongoIdPipe } from '../shared/pipes/mongoId.pipe';
import { ResourcePaginationPipe } from '../shared/pipes/resource-pagination.pipe';
import { CreateRefferalDto, UpdateRefferalDto } from './referral.dto';
import { ReferralService } from './referral.service';

@Controller('api/referrals')
export class ReferralController {
  constructor(private refferalService: ReferralService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async index(@Query() query: ResourcePaginationPipe): Promise<IApiCollection> {
    return this.refferalService.index(query);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async show(@Param() param: MongoIdPipe): Promise<IApiItem> {
    const { id } = param;
    const data = await this.refferalService.show(id);
    return apiItem('Referral', data);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(@Body() refferalDto: CreateRefferalDto): Promise<IApiItem> {
    const data = await this.refferalService.store(refferalDto);
    return apiCreated('Referral', data);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param() param: MongoIdPipe,
    @Body() refferalDto: UpdateRefferalDto,
  ): Promise<IApiItem> {
    const { id } = param;
    const data = await this.refferalService.update(id, refferalDto);
    return apiUpdated('Referral', data);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  async destroy(@Param() param: MongoIdPipe): Promise<IApiItem> {
    const { id } = param;
    await this.refferalService.destroy(id);
    return apiDeleted('Referral');
  }
}
