import { Module } from '@nestjs/common';
import { FightersService } from './fighters.service';
import { FightersResolver } from './fighters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './entities/fighters.entity';
import { Ranking } from '../ranking/entities/ranking.entity';
import { Statistics } from '../statistics/entities/statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter, Ranking, Statistics])],
  providers: [FightersService, FightersResolver],
})
export class FightersModule {}
