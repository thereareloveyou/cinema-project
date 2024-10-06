import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MovieService } from 'src/movie/movie.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [RatingService, PrismaService, MovieService, JwtService],
  controllers: [RatingController]
})
export class RatingModule {}
