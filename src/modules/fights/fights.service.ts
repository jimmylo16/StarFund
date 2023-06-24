import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFightsInput } from './dto/create-fights.input';
import { Fights } from './entities/Fights.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFightsInput } from './dto/update-fights.input';
import { UpdateFightsResultsInput } from './dto/update-fights-results.input';
import { RankingService } from '../ranking/rankings.service';
import { FightersService } from '../fighters/fighters.service';
import { Fighter } from '../fighters/entities/fighters.entity';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fights)
    private readonly fightsRepository: Repository<Fights>,
    private readonly rankingService: RankingService,
    private readonly fightersService: FightersService,
  ) {}

  async create(createFightsInput: CreateFightsInput) {
    const fighter1 = await this.fightersService.findOne(
      createFightsInput.fighter1_id,
    );
    const fighter2 = this.fightersService.findOne(
      createFightsInput.fighter2_id,
    );
    if (!fighter1 || !fighter2) {
      return new NotFoundException(`The fighters don't exist`);
    }
    const Fights = this.fightsRepository.create(createFightsInput);
    return await this.fightsRepository.save(Fights);
  }
  async findAll() {
    const Fights = await this.fightsRepository.find();

    return Fights;
  }
  async findOne(fight_id: string) {
    const fight = await this.fightsRepository.findOne({
      where: {
        fight_id,
      },
      relations: ['fighter1_id', 'fighter2_id'],
    });

    if (!fight) {
      throw new NotFoundException(`Fight #${fight_id} not found`);
    }
    return fight;
  }
  async update(
    fight_id: string,
    updateFightsInput: UpdateFightsInput,
  ): Promise<Fights> {
    const Fights = await this.fightsRepository.preload({
      fight_id: fight_id,
      ...updateFightsInput,
    });
    if (!Fights) {
      throw new NotFoundException(`Fights #${fight_id} not found`);
    }
    return this.fightsRepository.save(Fights);
  }

  async remove(fight_id: string) {
    const fights = await this.findOne(fight_id);
    if (!fights) {
      throw new NotFoundException(`Fights #${fight_id} not found`);
    }
    await this.fightsRepository.remove(fights);
    return {
      fight_id: fight_id,
    };
  }
  async handleFightResult(fight_id: string, result: 'win' | 'lose' | 'draw') {
    const fighter = await this.findOne(fight_id);
    let fighter_2_result: typeof result;
    switch (result) {
      case 'draw':
        fighter_2_result = 'draw';
        break;
      case 'win':
        fighter_2_result = 'lose';
        break;
      case 'lose':
        fighter_2_result = 'win';
        break;
    }

    const ranking1 = await this.rankingService.updateRankingsAfterFight(
      (fighter.fighter1_id as unknown as Fighter).fighter_id,
      result,
    );
    const ranking2 = await this.rankingService.updateRankingsAfterFight(
      (fighter.fighter2_id as unknown as Fighter).fighter_id,
      fighter_2_result,
    );
    return { ranking1, ranking2 };
  }
}
