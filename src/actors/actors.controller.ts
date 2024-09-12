import { ActorsService } from './actors.service'
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
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateActorDto } from './dto/actor.dto'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Get()
  @HttpCode(200)
  @Auth('admin')
  async getAllActors(@Query('searchTerm') searchTerm?: string) {
    return this.actorsService.getAll(searchTerm)
  }

  @Get(':id')
  @HttpCode(200)
  @Auth('admin')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.actorsService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.actorsService.createActor()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateActorDto) {
    return this.actorsService.updateActor(id, dto)
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.actorsService.delete(id)
  }
}
