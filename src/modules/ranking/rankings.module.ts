import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { RankingService } from './rankings.service';
import { Statistics } from '../statistics/entities/statistics.entity';
import { RankingResolver } from './ranking.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ranking]),
    TypeOrmModule.forFeature([Statistics]),
  ],
  providers: [RankingService, RankingResolver],
})
export class RankingsModule {}
