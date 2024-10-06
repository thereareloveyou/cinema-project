import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateMovie } from '../dto/CreateMovie.dto'
import { UpdateMovie } from 'src/dto/UpdateMove.dto'

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovie(dto: CreateMovie) {
    return await this.prisma.movie.create({
      include: {
        genres: true,
        actors: true,
        ratings: true,
      },
      data: {
        ...dto,
        genres: {
          connect: dto.genres.map((i) => ({ id: i })) || [],
        },
        actors: {
          connect: dto.actors.map((i) => ({ id: i })) || [],
        },
      },
    })
  }

  async getAllMovie() {
    return await this.prisma.movie.findMany({
      include: {
        genres: true,
        actors: true,
        ratings: true,
      },
    })
  }

  async getAllPopular() {
    return await this.prisma.movie.findMany({
      include: {
        genres: true,
      },
      where: {
        countOpened: {
          not: 0,
        },
      },
    })
  }

  async updateMovie(id: string, dto: UpdateMovie) {
    return await this.prisma.movie.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        genres: {
          connect: dto.genres.map((i) => ({ id: i })) || [],
        },
        actors: {
          connect: dto.actors.map((i) => ({ id: i })) || [],
        },
      },
    })
  }

  async updateCountOpened(slug: string) {
    const updateCount = await this.prisma.movie.update({
      where: {
        slug: slug,
      },
      data: {
        countOpened: { increment: 1 },
      },
    })

    return updateCount
  }

  async updateRating(id: string, newRating: number) {
    const data = this.prisma.movie.update({
      where: {
        id: id,
      },
      data: {
        averageRating: newRating,
      },
    })

    return data
  }
}
