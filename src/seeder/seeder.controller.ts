import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('api/seeder')
export class SeederController {
    constructor(private seederService: SeederService){}

    @Get()
    async index() {
        return this.seederService.seedRefferal()
    }
}
