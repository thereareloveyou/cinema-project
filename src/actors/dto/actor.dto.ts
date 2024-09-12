import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateActorDto {
  @IsString()
  name: string

  @IsString()
  surname: string

  @IsString()
  @IsOptional()
  photoUrl?: string

  @IsString()
  slug: string

  @IsString()
  role: string

  @IsString()
  DateOfBirth?: string

  @IsString()
  country?: string
}
