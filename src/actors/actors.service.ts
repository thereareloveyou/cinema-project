import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ActorsModel } from './actors.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateActorDto } from './dto/actor.dto'

@Injectable()
export class ActorsService {
  constructor(@InjectModel(ActorsModel) private readonly ActorsModel: ModelType<ActorsModel>) {}

  async byId(_id: string) {
    const user = await this.ActorsModel.findById(_id)

    if (!user) throw new BadRequestException('Not found Actor')

    return user
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm)
      options = {
        $or: [{ name: new RegExp(searchTerm, 'i') }, { slug: new RegExp(searchTerm, 'i') }],
      }

    return this.ActorsModel.aggregate()
      .match(options)
      .lookup({ from: 'Movie', foreignField: 'actors', localField: '_id', as: 'movies' })
      .addFields({ countMovies: { $size: '$movies' } })
      .project({ __v: 0, updatedAt: 0, movies: 0 })
      .sort({ createdAd: 'desc' })
      .exec()
  }

  async createActor() {
    const defaultValue: CreateActorDto = {
      name: '',
      surname: '',
      photoUrl: '',
      slug: '',
      role: '',
      DateOfBirth: '',
      country: '',
    }

    return this.ActorsModel.create(defaultValue)
  }

  async updateActor(_id: string, dto: CreateActorDto) {
    const updateActor = await this.ActorsModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()

    if (!updateActor) throw new NotFoundException('Actor not found!')

    return updateActor
  }

  async delete(_id: string) {
    const user = await this.ActorsModel.findById(_id)

    if (!user) throw new NotFoundException('Not found Actor')

    return this.ActorsModel.findByIdAndDelete(user._id)
  }
}
