import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';
import { FightsResolver } from './fights.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fights } from './entities/fights.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fights])],
  providers: [FightsService, FightsResolver],
})
export class FightModule {}
