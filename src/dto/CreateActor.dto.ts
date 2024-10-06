import { IsDefined, IsString } from 'class-validator'

export class CreateActor {
  @IsString()
  @IsDefined()
  name!: string

  @IsString()
  @IsDefined()
  surname!: string

  @IsString()
  @IsDefined()
  role!: string

  @IsString()
  @IsDefined()
  dateOfBirth?: string

  @IsString()
  @IsDefined()
  country?: string

  @IsString()
  @IsDefined()
  slug!: string
}
