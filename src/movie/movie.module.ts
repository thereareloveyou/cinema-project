import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, PrismaService]
})
export class MovieModule {}
