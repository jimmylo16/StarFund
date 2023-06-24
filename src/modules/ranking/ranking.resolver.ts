import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Ranking } from './entities/ranking.entity';
import { RankingService } from './rankings.service';

@Resolver(() => Ranking)
export class RankingResolver {
  constructor(private readonly rankingService: RankingService) {}
}
