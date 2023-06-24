import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFightsInput } from './dto/create-fights.input';
import { Fights } from './entities/Fights.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFightsInput } from './dto/update-fights.input';
import { UpdateFightsResultsInput } from './dto/update-fights-results.input';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fights)
    private readonly fightsRepository: Repository<Fights>,
  ) {}

  async create(createFightsInput: CreateFightsInput): Promise<Fights> {
    const Fights = this.fightsRepository.create(createFightsInput);
    return await this.fightsRepository.save(Fights);
  }
  async findAll() {
    const Fights = await this.fightsRepository.find();

    return Fights;
  }
  async findOne(fight_id: string) {
    const Fights = await this.fightsRepository.findOneBy({
      fight_id,
    });

    return Fights;
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

  async fightResult(
    fight_id: string,
    updateFightsResultsInput: UpdateFightsResultsInput,
  ) {
    const { fight_duration, fight_result, fight_rounds } =
      updateFightsResultsInput;

    return {
      fight_duration,
      fight_result,
      fight_rounds,
    };
  }
}
