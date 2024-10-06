import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { FileModule } from './file/file.module'

import { PrismaService } from './prisma.service'
import { GenreModule } from './genre/genre.module'
import { MovieModule } from './movie/movie.module';
import { RatingModule } from './rating/rating.module';
import { ActorModule } from './actor/actor.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, FileModule, GenreModule, MovieModule, RatingModule, ActorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
