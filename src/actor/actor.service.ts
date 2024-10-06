import { CreateActor } from 'src/dto/CreateActor.dto'

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService) {}

  async createActor(dto: CreateActor) {
    return await this.prisma.actor.create({
      data: {
        ...dto,
      },
    })
  }

  async byId(id: string) {
    const data = await this.prisma.actor.findFirst({
      where: {
        id: id,
      },
    })

    if (!data) throw new NotFoundException('Actor not found')

    return data
  }

  async getAllActors() {
    return await this.prisma.actor.findMany()
  }

  async deleteActor(id: string) {
    const data = await this.prisma.actor.delete({
      where: {
        id: id,
      },
    })

    if (!data) throw new NotFoundException('Actor not found')

    return data.id
  }

  async updateActor(id: string, dto: CreateActor) {
    const data = await this.prisma.actor.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    })

    if (!data) throw new BadRequestException('Failed update actor data')

    return data
  }
}
