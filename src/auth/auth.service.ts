import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { AuthDto } from './dto/auth.dto'
import { compare, genSalt, hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { UserService } from 'src/user/user.service'
import { PrismaService } from 'src/prisma.service'
import { Prisma, User } from '@prisma/client'

const EXPIRE_TIME = 20 * 1000

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(dto: AuthDto) {
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    })

    const { password, ...result } = newUser

    return result
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)

    const payload = {
      email: user.email,
    }

    return {
      user: this.returnUserFields(user),
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
          secret: process.env.JWT_SECRET,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_TOKEN,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
      },
    }
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
    }

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: process.env.JWT_SECRET,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
    }
  }

  async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })
    if (!user) throw new UnauthorizedException('User not found. You email is not correct')

    const isValidPassword = await compare(dto.password, user.password)
    if (!isValidPassword) throw new UnauthorizedException('Invalid password')

    return user
  }


  returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  }

  // async register(dto: AuthDto) {
  //   const oldUser = await this.userService.byId(dto)

  //   if (oldUser) throw new BadRequestException('User with this email is already in the system')

  //   const salt = await genSalt(5)

  //   const newUser = new this.UserModel({
  //     email: dto.email,
  //     password: await hash(dto.password, salt),
  //   })

  //   const user = await newUser.save()

  //   const tokens = await this.issueTokenPair(String(newUser._id))

  //   return {
  //     user: this.returnUserFields(user),
  //     ...tokens,
  //   }
  // }

  // async getNewTokens({ refreshToken }: RefreshTokenDto) {
  //   if (!refreshToken) throw new UnauthorizedException('Please sign in!')

  //   const result = await this.jwtService.verifyAsync(refreshToken)

  //   if (!result) throw new UnauthorizedException('Invalid token on expired!')

  //   const user = await this.UserModel.findById(result._id)

  //   const tokens = await this.issueTokenPair(String(user._id))

  //   return {
  //     user: this.returnUserFields(user),
  //     ...tokens,
  //   }
  // }

  // async issueTokenPair(userId: string) {
  //   const data = { _id: userId }

  //   const refreshToken = await this.jwtService.signAsync(data, {
  //     expiresIn: '7d',
  //     secret: process.env.JWT_SECRET,
  //   })

  //   const accessToken = await this.jwtService.signAsync(data, {
  //     expiresIn: '5m',
  //     secret: process.env.JWT_SECRET,
  //   })

  //   const expiresIn = new Date().setTime(new Date().getTime() + EXPIRE_TIME)

  //   return { refreshToken, accessToken, expiresIn }
  // }
}
