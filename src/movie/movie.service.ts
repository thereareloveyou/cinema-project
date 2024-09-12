import { Injectable } from '@nestjs/common'

import { NotFoundException } from '@nestjs/common'
import { Types } from 'mongoose'
import { CreateMovieDto } from './create-movie.dto'
import { InjectModel } from 'nestjs-typegoose'
import { MovieModel } from './movie.model'
import { ModelType } from '@typegoose/typegoose/lib/types'

@Injectable()
export class MovieService {
  constructor(@InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>) {}

  async bySlug(slug: string) {
    const doc = await this.MovieModel.findOne({ slug }).populate('actors genres').exec()

    if (!doc) throw new NotFoundException('Movie not found')

    return doc
  }

  async byActor(actorId: string) {
    const doc = await this.MovieModel.find({ actors: actorId }).exec()

    if (!doc) throw new NotFoundException('Movie not found')

    return doc
  }

  async byGenres(genreIds: Types.ObjectId[]) {
    const doc = await this.MovieModel.find({ genres: { $in: genreIds } }).exec()

    if (!doc) throw new NotFoundException('Movie not found')

    return doc
  }

  async getMostPopular() {
    return await this.MovieModel.find({ countOpened: { $gt: 0 } })
      .sort({ countOpened: -1 })
      .populate('genres')
      .exec()
  }

  async updateCountOpened(slug: string) {
    const updateDoc = await this.MovieModel.findOneAndUpdate(
      { slug },
      { $inc: { countOpened: 1 } },
      { new: true }
    ).exec()

    return updateDoc
  }

  async updateRating(id: Types.ObjectId, newRating: number) {
    return this.MovieModel.findByIdAndUpdate(
      id,
      {
        rating: newRating,
      },
      {
        new: true,
      }
    )
  }

  async byId(_id: string) {
    const doc = await this.MovieModel.findById(_id)

    if (!doc) throw new NotFoundException('Movie not found')

    return doc
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm)
      options = {
        $or: [{ title: new RegExp(searchTerm, 'i') }],
      }

    return this.MovieModel.find(options)
      .select('-updatedAt -__v')
      .sort({ createAd: 'desc' })
      .populate('actors genres')
      .exec()
  }

  async create() {
    const defaultValue: CreateMovieDto = {
      bigPoster: '',
      poster: '',
      title: '',
      parameters: {
        year: 0,
        duration: 0,
        country: '',
      },
      slug: '',
      description: '',
      videoUrl: '',
      genres: [],
      actors: [],
    }

    const newMovie = await this.MovieModel.create(defaultValue)

    return newMovie._id
  }

  async update(_id: string, dto: CreateMovieDto) {
    const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()

    if (!updateDoc) throw new NotFoundException('Movie not found')

    return updateDoc
  }

  async delete(_id: string) {
    const deleteDoc = await this.MovieModel.findByIdAndDelete(_id)

    if (!deleteDoc) throw new NotFoundException('Movie not found')

    return deleteDoc
  }
}
