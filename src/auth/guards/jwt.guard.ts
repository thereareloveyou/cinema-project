import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { Observable } from 'rxjs'


@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()

    const token = this.extractTokenFromHeader(req)


    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })

      req['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request) {

    if (request.headers.authorization !== undefined){
      const [type, token] = request.headers.authorization.split(' ') ?? []

      return type === 'Bearer' ? token : undefined
    }
    
    throw new UnauthorizedException('You not have access token')

  }
}
