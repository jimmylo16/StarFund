import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { RankingService } from './rankings.service';
import { Statistics } from '../statistics/entities/statistics.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ranking]),
    TypeOrmModule.forFeature([Statistics]),
  ],
  providers: [RankingService],
})
export class RankingsModule {}
