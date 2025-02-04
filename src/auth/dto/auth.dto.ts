import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsString()
  email: string

  @MinLength(6, {
    message: 'Password cannot be less 6 characters',
  })
  @IsString()
  password: string
}
