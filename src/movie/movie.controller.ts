import { IdValidationPipe } from './../pipes/id.validation.pipe'
import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common'
import { MovieService } from './movie.service'
import { CreateMovie } from 'src/dto/CreateMovie.dto'

@Controller('movies')
export class MovieController {
  constructor(private readonly MovieService: MovieService) {}

  @Post()
  @HttpCode(200)
  async createMovie(@Body() dto: CreateMovie) {
    return this.MovieService.createMovie(dto)
  }

  @Get()
  @HttpCode(200)
  async getAllMovies() {
    return this.MovieService.getAllMovie()
  }

  @Get('most-popular')
  @HttpCode(200)
  async getPopularMovies() {
    return this.MovieService.getAllPopular()
  }

  @Put(':id')
  @HttpCode(200)
  async updateMovie(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateMovie) {
    return this.MovieService.updateMovie(id, dto)
  }

  @Post('update-count-opened/:slug')
  @HttpCode(200)
  async updateCountOpened(@Param('slug') slug: string) {
    return this.MovieService.updateCountOpened(slug)
  }
}
