import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common'
import { ActorService } from './actor.service'
import { CreateActor } from 'src/dto/CreateActor.dto'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'

@Controller('actors')
export class ActorController {
  constructor(private readonly ActorService: ActorService) {}

  @Post()
  @HttpCode(200)
  async createActor(@Body() dto: CreateActor) {
    return this.ActorService.createActor(dto)
  }

  @Get(':id')
  @HttpCode(200)
  async getActorById(@Param('id', IdValidationPipe) id: string) {
    return this.ActorService.byId(id)
  }

  @Get()
  @HttpCode(200)
  async getAllActors() {
    return this.ActorService.getAllActors()
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteActor(@Param('id', IdValidationPipe) id: string) {
    return this.ActorService.deleteActor(id)
  }

  @Put(':id')
  @HttpCode(200)
  async updateActor(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateActor) {
    return this.ActorService.updateActor(id, dto)
  }
}
