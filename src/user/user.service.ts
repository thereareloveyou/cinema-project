import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateUserDto } from './dto/update-user.dto'
import { genSalt } from 'bcryptjs'
import { hash } from 'crypto'
import { Types } from 'mongoose'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    })

    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async updateProfile(id: string, dto: UpdateUserDto) {
    const user = await this.byId(id)
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (isSameUser && id !== isSameUser.id) throw new NotFoundException('Email busy')

    if (dto.password) {
      const salt = await genSalt(10)
      user.password = await hash(dto.password, salt)
    }

    user.email = dto.email
    if (dto.role || dto.role == 'ADMIN') user.role = dto.role

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    })
    return user
  }

  async getCount() {
    return await this.prisma.user.count()
  }

  async getAllUsers(searchTerm?: string) {
    let options = {
      include: {
        ratings: true,
      },
      where: {},
    }

    if (searchTerm) {
      options.where = { email: searchTerm }
    }

    return await this.prisma.user.findMany(options)
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    })
  }

  // async toggleFavorite(movieId: Types.ObjectId, user: UserModel) {
  //   const { _id, favorites } = user

  //   await this.UserModel.findByIdAndUpdate(_id, {
  //     favorites: favorites.includes(movieId)
  //       ? favorites.filter((id) => String(id) !== String(movieId))
  //       : [...favorites, movieId],
  //   })
  // }

  // async getFavoriteMovies(_id: Types.ObjectId) {
  //   return await this.UserModel.findById(_id, 'favorites')
  //     .populate({ path: 'favorites', populate: { path: 'genres' } })
  //     .exec()
  //     .then((data) => data.favorites)
  // }
}
