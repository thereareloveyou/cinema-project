import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ActorsModel } from './actors.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ActorsController],
  providers: [ActorsService],
  imports: [
    TypegooseModule.forFeature([{ typegooseClass: ActorsModel, schemaOptions: { collection: 'Actors' } }]),
    ConfigModule
  ]
})
export class ActorsModule {}
