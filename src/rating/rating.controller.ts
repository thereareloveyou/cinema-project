import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { RatingService } from './rating.service'
import { User } from 'src/user/decorators/user.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { Types } from 'mongoose'
import { SetRatingDto } from './set-rating.dto'

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(':movieId')
  @Auth()
  async getRating(@Param('movieId', IdValidationPipe) movieId: Types.ObjectId, @User('_id') _id: Types.ObjectId) {
    return this.ratingService.getMovieValueByUser(movieId, _id)
  }

  @UsePipes(new ValidationPipe())
  @Post('set-rating')
  @HttpCode(200)
  @Auth()
  async setRating(@Body() dto: SetRatingDto, @User('_id') _id: Types.ObjectId) {
    return this.ratingService.setRating(_id, dto)
  }
}
