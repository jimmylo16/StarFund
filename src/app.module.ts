import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FightersModule } from './modules/fighters/fighters.module';
import { EventsModule } from './modules/events/events.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { FightModule } from './modules/fights/fights.module';
import { RankingsModule } from './modules/ranking/rankings.module';
import { dataSourceOpttions } from 'db/data-source';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './schema.gql',
      // debug: true,
      playground: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot(dataSourceOpttions),
    EventsModule,
    FightersModule,
    StatisticsModule,
    FightModule,
    RankingsModule,
  ],
})
export class AppModule {}
