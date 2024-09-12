import { Module } from '@nestjs/common'
import { GenreController } from './genre.controller'
import { GenreService } from './genre.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { GenreModel } from './genre.model'
import { MovieModule } from 'src/movie/movie.module'

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports: [
    TypegooseModule.forFeature([{ typegooseClass: GenreModel, schemaOptions: { collection: 'Genre' } }]),
    MovieModule,
  ],
  exports: [GenreModule],
})
export class GenreModule {}
