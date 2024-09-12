import { IsArray, IsBoolean, IsNumber, IsObject, IsString } from 'class-validator'

export class Parameters {
  @IsNumber()
  year: number

  @IsNumber()
  duration: number

  @IsNumber()
  country: string
}

export class CreateMovieDto {
  @IsString()
  poster: string

  @IsString()
  bigPoster: string

  @IsString()
  title: string

  @IsString()
  slug: string

  @IsString()
  description: string

  @IsObject()
  parameters?: Parameters

  @IsString()
  videoUrl: string

  @IsArray()
  @IsString({ each: true })
  genres: string[]

  @IsArray()
  @IsString({ each: true })
  actors: string[]

  @IsBoolean()
  idSendTelegram?: boolean
}
