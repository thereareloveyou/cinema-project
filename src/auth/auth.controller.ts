import { AuthService } from './auth.service'
import { Body, Controller, HttpCode, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { JwtGuard } from './guards/jwt.guard'
import { RefreshGwtGuard } from './guards/refresh.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.AuthService.register(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return await this.AuthService.login(dto)
  }

  @UseGuards(RefreshGwtGuard)
  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Request() req) {
    return await this.AuthService.refreshToken(req.user)
  }
}
