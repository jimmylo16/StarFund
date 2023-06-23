import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateFighterInput } from './dto/create-fighters.input';
import { Fighter } from './entities/fighters.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Targs } from './fighters.resolver';
import { UpdateFighterInput } from './dto/update-fighters.input';

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter)
    private readonly fighterRepository: Repository<Fighter>,
  ) {}

  async create(createFighterInput: CreateFighterInput): Promise<Fighter> {
    const fighter = this.fighterRepository.create(createFighterInput);
    return await this.fighterRepository.save(fighter);
  }
  async findAll() {
    const fighters = await this.fighterRepository.find();

    return fighters;
  }
  async findOne(fighter_id: string) {
    const fighter = await this.fighterRepository.findOneBy({ fighter_id });

    return fighter;
  }
  async update(
    fighter_id: string,
    updateUserInput: UpdateFighterInput,
  ): Promise<Fighter> {
    const fighter = await this.fighterRepository.preload({
      fighter_id: fighter_id,
      ...updateUserInput,
    });
    if (!fighter) {
      throw new NotFoundException(`User #${fighter_id} not found`);
    }
    return this.fighterRepository.save(fighter);
  }

  async remove(fighter_id: string) {
    const fighter = await this.findOne(fighter_id);
    if (!fighter) {
      throw new NotFoundException(`User #${fighter_id} not found`);
    }
    await this.fighterRepository.remove(fighter);
    return {
      fighter_id: fighter_id,
    };
  }
  // private handleDBExceptions(error: any) {
  //   if (error.code === '23505') throw new BadRequestException(error.detail);

  //   this.logger.error(error);
  //   // console.log(error)
  //   throw new InternalServerErrorException(
  //     'Unexpected error, check server logs',
  //   );
  // }
}
