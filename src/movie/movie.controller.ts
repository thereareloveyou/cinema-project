import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { MovieService } from './movie.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { Types } from 'mongoose'
import { CreateMovieDto } from './create-movie.dto'

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('by-slug/:slug')
  async bySlag(@Param('slug') slug: string) {
    return this.movieService.bySlug(slug)
  }

  @Get('by-actor/:actorId')
  async byActor(@Param('actorId', IdValidationPipe) actorId: string) {
    return this.movieService.byActor(actorId)
  }

  @Post('by-genres')
  @HttpCode(200)
  async byGenres(@Body('genreIds') genreIds: Types.ObjectId[]) {
    return this.movieService.byGenres(genreIds)
  }

  @Get()
  async getAllMovies(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm)
  }

  @Get('most-popular')
  async getMostPopular() {
    return this.movieService.getMostPopular()
  }

  @Post('update-count-opened')
  @HttpCode(200)
  async updateCountOpened(@Body('slug') slug: string) {
    return this.movieService.updateCountOpened(slug)
  }

  @Get(':id')
  @Auth('admin')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.movieService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.movieService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateMovieDto) {
    return this.movieService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.movieService.delete(id)
  }
}
