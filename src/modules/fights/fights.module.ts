import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';
import { FightsResolver } from './fights.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fights } from './entities/fights.entity';
import { RankingService } from '../ranking/rankings.service';
import { Ranking } from '../ranking/entities/ranking.entity';
import { Statistics } from '../statistics/entities/statistics.entity';
import { Fighter } from '../fighters/entities/fighters.entity';
import { FightersService } from '../fighters/fighters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fights, Ranking, Statistics, Fighter])],
  providers: [FightsService, FightsResolver, RankingService, FightersService],
})
export class FightModule {}
