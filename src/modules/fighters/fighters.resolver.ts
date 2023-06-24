import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FightersService } from './fighters.service';
import { Fighter } from './entities/fighters.entity';
import { CreateFighterInput } from './dto/create-fighters.input';
import { UpdateFighterInput } from './dto/update-fighters.input';

export type Targs = {
  test: string;
};
@Resolver(() => Fighter)
export class FightersResolver {
  constructor(private readonly fightersService: FightersService) {}

  @Mutation(() => Fighter)
  createFighter(
    @Args('createFighterInput') createFighterInput: CreateFighterInput,
  ) {
    return this.fightersService.create(createFighterInput);
  }

  @Query(() => [Fighter], { name: 'fighters' })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ) {
    return this.fightersService.findAll(take, skip);
  }
  @Query(() => Fighter, { name: 'fighter' })
  findOne(@Args('fighter_id', { type: () => String }) fighter_id: string) {
    return this.fightersService.findOne(fighter_id);
  }

  @Mutation(() => Fighter)
  updateFighter(
    @Args('updateFighterInput') updateFighterInput: UpdateFighterInput,
  ) {
    return this.fightersService.update(
      updateFighterInput.fighter_id,
      updateFighterInput,
    );
  }

  @Mutation(() => Fighter)
  removeFighter(
    @Args('fighter_id', { type: () => String }) fighter_id: string,
  ) {
    return this.fightersService.remove(fighter_id);
  }
}
