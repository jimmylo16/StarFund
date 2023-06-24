import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FightsService } from './fights.service';
import { Fights } from './entities/fights.entity';
import { CreateFightsInput } from './dto/create-fights.input';
import { UpdateFightsInput } from './dto/update-fights.input';

@Resolver(() => Fights)
export class FightsResolver {
  constructor(private readonly fightsService: FightsService) {}

  @Mutation(() => Fights)
  createfights(
    @Args('createfightsInput') createfightsInput: CreateFightsInput,
  ) {
    return this.fightsService.create(createfightsInput);
  }

  @Query(() => [Fights], { name: 'fights' })
  findAll() {
    return this.fightsService.findAll();
  }
  @Query(() => Fights, { name: 'fight' })
  findOne(@Args('fights_id', { type: () => String }) fights_id: string) {
    return this.fightsService.findOne(fights_id);
  }

  @Mutation(() => Fights)
  updatefights(
    @Args('updateFightsInput') updateFightsInput: UpdateFightsInput,
  ) {
    return this.fightsService.update(
      updateFightsInput.fight_id,
      updateFightsInput,
    );
  }

  @Mutation(() => Fights)
  removefights(@Args('fights_id', { type: () => String }) fights_id: string) {
    return this.fightsService.remove(fights_id);
  }
}
