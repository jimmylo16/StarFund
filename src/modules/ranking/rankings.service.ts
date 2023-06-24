import { Injectable } from '@nestjs/common';
import { Ranking } from './entities/ranking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistics } from '../statistics/entities/statistics.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingsRepository: Repository<Ranking>,
    @InjectRepository(Statistics)
    private readonly statisticsRepository: Repository<Statistics>,
  ) {}

  async updateRankingsAfterFight(
    fighter_id: string,
    result: string,
  ): Promise<void> {
    const fighterStatistics = await this.statisticsRepository.findOneBy({
      fighter_id,
    });
    console.log(23, { fighterStatistics, fighter_id });
    //Create fighterStatistic if not exist
    if (!fighterStatistics) {
      const test = this.statisticsRepository.create({
        fighter_id,
      });
      console.log(test, fighter_id);
    }

    const ranking = await this.rankingsRepository.findOneBy({ fighter_id });

    //Create fighter Ranking if not exist
    if (!ranking) {
      this.rankingsRepository.create({
        fighter_id,
      });
    }

    console.log({ fighterStatistics });

    if (result === 'win') {
      fighterStatistics.total_wins += 1;
      ranking.ranking_position = fighterStatistics.total_wins;
    } else if (result === 'loss') {
      fighterStatistics.total_losses += 1;
    } else if (result === 'draw') {
      fighterStatistics.total_draws += 1;
    }

    await this.statisticsRepository.save(fighterStatistics);
    await this.rankingsRepository.save(ranking);
  }
}
