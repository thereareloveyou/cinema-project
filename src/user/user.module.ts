import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from 'src/auth/auth.module'
import { AuthService } from 'src/auth/auth.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'

@Module({
  providers: [UserService, PrismaService, JwtService],
  controllers: [UserController],
  imports: [],
})
export class UserModule {}
