import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatisticsInput } from './dto/create-statistics.input';
import { Statistics } from './entities/statistics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStatisticsInput } from './dto/update-statistics.input';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private readonly statisticsRepository: Repository<Statistics>,
  ) {}

  async create(
    createStatisticsInput: CreateStatisticsInput,
  ): Promise<Statistics> {
    const Statistics = this.statisticsRepository.create(createStatisticsInput);
    return await this.statisticsRepository.save(Statistics);
  }
  async findAll() {
    const statistics = await this.statisticsRepository.find();

    return statistics;
  }
  async findOne(statistics_id: string) {
    const Statistics = await this.statisticsRepository.findOneBy({
      statistics_id,
    });

    return Statistics;
  }
  async update(
    statistics_id: string,
    updateStatisticsInput: UpdateStatisticsInput,
  ): Promise<Statistics> {
    const Statistics = await this.statisticsRepository.preload({
      statistics_id: statistics_id,
      ...updateStatisticsInput,
    });
    if (!Statistics) {
      throw new NotFoundException(`Statistics #${statistics_id} not found`);
    }
    return this.statisticsRepository.save(Statistics);
  }

  async remove(statistics_id: string) {
    const Statistics = await this.findOne(statistics_id);
    if (!Statistics) {
      throw new NotFoundException(`Statistics #${statistics_id} not found`);
    }
    await this.statisticsRepository.remove(Statistics);
    return {
      statistics_id: statistics_id,
    };
  }
}
