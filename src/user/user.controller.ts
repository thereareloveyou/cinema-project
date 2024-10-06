import { Body, Controller, Delete, Get, HttpCode, Param, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserService } from './user.service'

import { UpdateUserDto } from './dto/update-user.dto'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { JwtGuard } from 'src/auth/guards/jwt.guard'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile/')
  @UseGuards(JwtGuard)
  async getProfile(@Query('id') id: string) {
    return await this.userService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtGuard)
  @Put('profile/:id')
  @HttpCode(200)
  async updateProfile(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(id, dto)
  }

  // @Put('profile/favorites')
  // @HttpCode(200)
  // async toggleFavorite(@Body('movieId', IdValidationPipe) movieId: Types.ObjectId, @User() user: UserModel) {
  //   return this.userService.toggleFavorite(movieId, user)
  // }

  // @Get('profile/favorites')
  // @HttpCode(200)
  // async getFavorites(@User('_id') _id: Types.ObjectId) {
  //   return this.userService.getFavoriteMovies(_id)
  // }

  // @UsePipes(new ValidationPipe())
  // @Put(':id')
  // @HttpCode(200)
  // @Auth('admin')
  // async updateUser(@Param('id', IdValidationPipe) _id: string, @Body() dto: UpdateUserDto) {
  //   return this.userService.updateProfile(_id, dto)
  // }

  @Get('count')
  async getCountUser() {
    return this.userService.getCount()
  }

  @Get()
  async getUsers(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAllUsers(searchTerm)
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    return this.userService.delete(id)
  }
}
