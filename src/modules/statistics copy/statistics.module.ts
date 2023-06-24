import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistics } from './entities/statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statistics])],
  providers: [StatisticsService, StatisticsResolver],
})
export class StatisticsModule {}
