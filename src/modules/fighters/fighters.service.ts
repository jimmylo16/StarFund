import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFighterInput } from './dto/create-fighters.input';
import { Fighter } from './entities/fighters.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFighterInput } from './dto/update-fighters.input';
import { Ranking } from '../ranking/entities/ranking.entity';
import { Statistics } from '../statistics/entities/statistics.entity';

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter)
    private readonly fighterRepository: Repository<Fighter>,
    @InjectRepository(Ranking)
    private readonly rankingsRepository: Repository<Ranking>,
    @InjectRepository(Statistics)
    private readonly statisticsRepository: Repository<Statistics>,
  ) {}

  async create(createFighterInput: CreateFighterInput): Promise<Fighter> {
    const fighter = this.fighterRepository.create(createFighterInput);
    await this.fighterRepository.save(fighter);
    const ranking = this.rankingsRepository.create({
      fighter_id: fighter.fighter_id,
    });
    await this.rankingsRepository.save(ranking);
    const statistics = this.statisticsRepository.create({
      fighter_id: fighter.fighter_id,
    });
    await this.statisticsRepository.save(statistics);
    return fighter;
  }
  async findAll(take = 10, skip = 0) {
    const fighters = await this.fighterRepository.find({
      take: take,
      skip: skip,
    });

    return fighters;
  }
  async findOne(fighter_id: string) {
    const fighter = await this.fighterRepository.findOneBy({ fighter_id });

    return fighter;
  }
  async update(
    fighter_id: string,
    updateFighterInput: UpdateFighterInput,
  ): Promise<Fighter> {
    const fighter = await this.fighterRepository.preload({
      fighter_id: fighter_id,
      ...updateFighterInput,
    });
    if (!fighter) {
      throw new NotFoundException(`Fighter #${fighter_id} not found`);
    }
    return this.fighterRepository.save(fighter);
  }

  async remove(fighter_id: string) {
    const fighter = await this.findOne(fighter_id);
    if (!fighter) {
      throw new NotFoundException(`Fighter #${fighter_id} not found`);
    }
    await this.fighterRepository.remove(fighter);
    return {
      fighter_id: fighter_id,
    };
  }
}
