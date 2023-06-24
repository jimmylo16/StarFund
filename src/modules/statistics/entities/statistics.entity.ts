import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'statistics' })
@ObjectType()
export class Statistics {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the statistics' })
  statistics_id: string;

  @Column({ type: 'uuid' })
  @Field(() => String, { description: 'Statistic of the fighter' })
  fighter_id: string;

  @Column({ type: 'int' })
  @Field(() => Int, { description: 'total wins of the fighter' })
  total_wins: number;

  @Column({ type: 'int' })
  @Field(() => Int, { description: 'total losses of the fighter' })
  total_losses: number;

  @Column({ type: 'int' })
  @Field(() => Int, { description: 'total draws of the fighter' })
  total_draws: number;

  @Column({ type: 'int' })
  @Field(() => Int, { description: 'total draws of the fighter' })
  knockout_wins: number;

  @Column({ type: 'int' })
  @Field(() => Int, { description: 'total draws of the fighter' })
  submission_wins: number;

  @Column({ type: 'int' })
  @Field(() => Int, { description: 'total draws of the fighter' })
  decision_wins: number;
}
