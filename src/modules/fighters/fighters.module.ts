import { Module } from '@nestjs/common';
import { FightersService } from './fighters.service';
import { FightersResolver } from './fighters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './entities/fighters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FightersService, FightersResolver],
})
export class FightersModule {}
