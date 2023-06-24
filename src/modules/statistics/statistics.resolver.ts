import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';
import { Statistics } from './entities/statistics.entity';
import { CreateStatisticsInput } from './dto/create-statistics.input';
import { UpdateStatisticsInput } from './dto/update-statistics.input';

export type Targs = {
  test: string;
};
@Resolver(() => Statistics)
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Mutation(() => Statistics)
  createStatistics(
    @Args('createStatisticsInput') createStatisticsInput: CreateStatisticsInput,
  ) {
    return this.statisticsService.create(createStatisticsInput);
  }

  @Query(() => [Statistics], { name: 'statistics' })
  findAll() {
    return this.statisticsService.findAll();
  }
  @Query(() => Statistics, { name: 'statistic' })
  findOne(
    @Args('statistics_id', { type: () => String }) statistics_id: string,
  ) {
    return this.statisticsService.findOne(statistics_id);
  }

  @Mutation(() => Statistics)
  updateStatistics(
    @Args('updateStatisticsInput') updateStatisticsInput: UpdateStatisticsInput,
  ) {
    return this.statisticsService.update(
      updateStatisticsInput.statistics_id,
      updateStatisticsInput,
    );
  }

  @Mutation(() => Statistics)
  removeStatistics(
    @Args('statistics_id', { type: () => String }) statistics_id: string,
  ) {
    return this.statisticsService.remove(statistics_id);
  }
}
