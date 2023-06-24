import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fighter } from 'src/modules/fighters/entities/fighters.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'statistics' })
@ObjectType()
export class Statistics {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the statistics' })
  statistics_id: string;

  @Column({ type: 'uuid' })
  @OneToOne(() => Fighter, (fighter) => fighter.fighter_id, {
    onDelete: 'CASCADE',
  })
  @Field(() => String, { description: 'Statistic of the fighter' })
  fighter_id: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: 'total wins of the fighter' })
  total_wins: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: 'total losses of the fighter' })
  total_losses: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: 'total draws of the fighter' })
  total_draws: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: 'total draws of the fighter' })
  knockout_wins: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: 'total draws of the fighter' })
  submission_wins: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: 'total draws of the fighter' })
  decision_wins: number;
}
