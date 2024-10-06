import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { Types } from 'mongoose'

export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') return value

    if (typeof value !== 'string') throw new BadRequestException('Invalid format id')

    return value
  }
}
