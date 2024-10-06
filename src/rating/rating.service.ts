import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { MovieService } from 'src/movie/movie.service'

@Injectable()
export class RatingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movieService: MovieService
  ) {}

  async setRating(dto: { ratingValue: number; userId: string; movieId: string }) {
    const newRating = await this.prisma.usersOnRatingsMovies.upsert({
      where: {
        movieId_userId: {
          movieId: dto.movieId,
          userId: dto.userId,
        },
      },
      update: { ratingValue: dto.ratingValue },
      create: {
        movieId: dto.movieId,
        userId: dto.userId,
        ratingValue: dto.ratingValue,
      },
    })

    if (!newRating) throw new NotFoundException('Could not find or update rating')

    const avgRating = await this.avgRating(dto.movieId)

    await this.movieService.updateRating(dto.movieId, avgRating)

    return newRating
  }

  async avgRating(id: string) {
    const avg = await this.prisma.usersOnRatingsMovies.aggregate({
      _avg: {
        ratingValue: true,
      },
      where: {
        movieId: id,
      },
    })

    return avg._avg.ratingValue
  }
}
