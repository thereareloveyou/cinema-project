import { Injectable } from '@nestjs/common'
import { Genre } from '../dto/Genre.model'
import { PrismaService } from 'src/prisma.service'
import { GenreUpdate } from 'src/dto/GenreUpdate.dto'

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  async byId(id: string) {
    return await this.prisma.genre.findUnique({
      where: {
        id: id,
      },
    })
  }

  async bySlug(slug: string) {
    return await this.prisma.genre.findUnique({
      where: {
        slug: slug,
      },
    })
  }

  async getAllGenres(searchTerm?: string) {
    if (searchTerm) {
      return await this.prisma.genre.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm } },
            { slug: { contains: searchTerm } },
            { description: { contains: searchTerm } },
          ],
        },
      })
    }

    return await this.prisma.genre.findMany()
  }

  async createGenre(dto: Genre) {
    const genre = await this.prisma.genre.create({
      data: {
        ...dto
      },
    })

    return genre.id
  }

  async deleteGenre(id: string) {
    return await this.prisma.genre.delete({
      where: {
        id: id,
      },
    })
  }

  async updateGenre(dto: GenreUpdate, id: string) {
    return await this.prisma.genre.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    })
  }
}
