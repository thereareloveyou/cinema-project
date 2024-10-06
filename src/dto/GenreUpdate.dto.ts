import { IsDefined, IsString } from 'class-validator'

export class GenreUpdate {
  @IsDefined()
  @IsString()
  name!: string

  @IsDefined()
  @IsString()
  slug!: string

  @IsDefined()
  @IsString()
  description!: string

  @IsDefined()
  @IsString()
  icon!: string
}
