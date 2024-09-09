import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { GenreModel } from './genre.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateGenreDto } from './dto/create-genre.dto'

@Injectable()
export class GenreService {
  constructor(@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>) {}

  async byId(_id: string) {
    const genre = await this.GenreModel.findById(_id)

    if (!genre) throw new NotFoundException('Genre not found!')

    return genre
  }

  async bySlag(slug: string) {
    return this.GenreModel.findOne({ slug }).exec()
  }

  async create() {
    const defaultValue: CreateGenreDto = {
      description: '',
      name: '',
      slug: '',
      icon: '',
    }

    const genre = await this.GenreModel.create(defaultValue)
    return genre._id
  }

  async update(_id: string, dto: CreateGenreDto) {
    const updateGenre = await this.GenreModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()

    if (!updateGenre) throw new NotFoundException('Not found genre')

    return updateGenre
  }

  async delete(_id: string) {
    const deleteGenre = await this.GenreModel.findByIdAndDelete(_id)

    if (!deleteGenre) throw new NotFoundException('Not found genre')

    return deleteGenre
  }

  async getAllGenres(searchTerm?: string) {
    let options = {}

    if (searchTerm)
      options = {
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { slug: new RegExp(searchTerm, 'i') },
          { description: new RegExp(searchTerm, 'i') },
        ],
      }

    return this.GenreModel.find(options).select('-updateAt -__v').sort({ createdAd: 'desc' }).exec()
  }

  async getCollections() {
    const genres = await this.getAllGenres()
    const collections = genres

    return collections
  }
}
