import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { apiCreated, apiDeleted, apiItem, apiUpdated } from '../helpers/responseParser';
import { IApiCollection, IApiItem } from '../shared/interfaces/response-parser.interface';
import { MongoIdPipe } from '../shared/pipes/mongoId.pipe';
import { ResourcePaginationPipe } from '../shared/pipes/resource-pagination.pipe';
import { CreateBulkReferralDto, CreateReferralDto, UpdateReferralDto } from './referral.dto';
import { ReferralService } from './referral.service';

@Controller('api')
export class ReferralController {
  constructor(private referralService: ReferralService) {}

  @Get('referrals')
  @UsePipes(ValidationPipe)
  async index(@Query() query: ResourcePaginationPipe): Promise<IApiCollection> {
    return this.referralService.index(query);
  }

  @Get('/referrals/:id')
  @UsePipes(ValidationPipe)
  async show(@Param('id') id: string): Promise<IApiItem> {
    const data = await this.referralService.show(id);
    return apiItem('Referral', data);
  }

  @Get('referrals/:code/check')
  async checkExist(@Param('code') code: string): Promise<boolean> {
    return await this.referralService.checkExist(code);
  }

  @Post('/referrals')
  @UsePipes(ValidationPipe)
  async store(@Body() referralDto: CreateReferralDto): Promise<IApiItem> {
    const data = await this.referralService.store(referralDto);
    return apiCreated('Referral', data);
  }

  @Post('/referrals-bulk')
  @UsePipes(ValidationPipe)
  async bulkStore(@Body() referralDto: CreateBulkReferralDto): Promise<IApiItem> {
    const codes: string[] = referralDto.referrals.map(r => r.code)
    const uniqueCodes: string[] = [...new Set(codes)]
    if(codes.length !== uniqueCodes.length) {
      throw new BadRequestException('One or more referral code already exists')
    }
    const referrals = await this.referralService.checkReferrals('code', codes)
    if(referrals.length > 0) {
      throw new BadRequestException('One or more referral code already exists')
    }
    const data = await this.referralService.bulkStore(referralDto);
    return apiCreated('Referral', data);
  }

  @Put('/referrals/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Param() param: MongoIdPipe,
    @Body() referralDto: UpdateReferralDto,
  ): Promise<IApiItem> {
    const { id } = param;
    const data = await this.referralService.update(id, referralDto);
    return apiUpdated('Referral', data);
  }

  @Delete('/referrals/:id')
  @UsePipes(ValidationPipe)
  async destroy(@Param() param: MongoIdPipe): Promise<IApiItem> {
    const { id } = param;
    await this.referralService.destroy(id);
    return apiDeleted('Referral');
  }
}
