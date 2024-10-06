import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('ratings')
export class RatingController {

    constructor(private readonly RatingService: RatingService){}


    @Post('set-rating')
    @UseGuards(JwtGuard)
    async setRating(@Body() dto: {ratingValue: number, userId: string, movieId: string}){
        return this.RatingService.setRating(dto)
    }

    @Get('avg/:id')
    async avgRating(@Param('id') id: string){
        return this.RatingService.avgRating(id)
    }

}
