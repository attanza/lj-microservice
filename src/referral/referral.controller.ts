import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { MongoIdPipe } from '../shared/pipes/mongoId.pipe';
import { CreateRefferalDto, UpdateRefferalDto } from './referral.dto';
import { IRefferal } from './referral.interface';
import { ReferralService } from './referral.service';

@Controller('api/refferals')
export class ReferralController {
  constructor(private refferalService: ReferralService) {}

  @Get()
  async index(): Promise<IRefferal[]> {
    return this.refferalService.index();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async show(@Param() param: MongoIdPipe): Promise<IRefferal> {
    const { id } = param;
    return await this.refferalService.show(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(@Body() refferalDto: CreateRefferalDto): Promise<IRefferal> {
    return await this.refferalService.store(refferalDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param() param: MongoIdPipe,
    @Body() refferalDto: UpdateRefferalDto,
  ): Promise<IRefferal> {
    const { id } = param;
    return await this.refferalService.update(id, refferalDto);
  }

  @Delete()
  @UsePipes(ValidationPipe)
  async destroy(@Param() param: MongoIdPipe): Promise<string> {
    const { id } = param;
    return await this.refferalService.destroy(id);
  }
}
