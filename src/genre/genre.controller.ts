import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common'
import { GenreService } from './genre.service'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { GenreUpdate } from 'src/dto/GenreUpdate.dto'
import { Genre } from 'src/dto/Genre.model'

@Controller('genres')
export class GenreController {
  constructor(private readonly GenreService: GenreService) {}

  @Get(':id')
  @HttpCode(200)
  async getGenreById(@Param('id', IdValidationPipe) id: string) {
    return this.GenreService.byId(id)
  }

  @Get('by-slug/:slug')
  @HttpCode(200)
  async getGenreBySlug(@Param('slug') slug: string) {
    return this.GenreService.bySlug(slug)
  }

  @Get()
  @HttpCode(200)
  async getAllGenres(@Query('searchTerm') searchTerm: string) {
    return this.GenreService.getAllGenres(searchTerm)
  }

  @Post()
  @HttpCode(200)
  async createGenre(@Body() dto: Genre) {
    return this.GenreService.createGenre(dto)
  }

  @Put(':id')
  @HttpCode(200)
  async updateGenre(@Param('id', IdValidationPipe) id: string, @Body() dto: GenreUpdate) {
    return this.GenreService.updateGenre(dto, id)
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteGenre(@Param('id', IdValidationPipe) id: string) {
    return this.GenreService.deleteGenre(id)
  }
}
