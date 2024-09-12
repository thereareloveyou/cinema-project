import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface ActorsModel extends Base {}

export class ActorsModel extends TimeStamps {
  @prop()
  name?: string

  @prop()
  surname?: string

  @prop()
  role?: string

  @prop()
  DateOfBirth?: string

  @prop()
  country?: string

  @prop()
  slug?: string
}
