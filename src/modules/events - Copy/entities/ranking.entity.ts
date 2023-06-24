import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fighter } from 'src/modules/fighters/entities/fighters.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ranking' })
@ObjectType()
export class Ranking {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the ranking' })
  @OneToOne(() => Fighter, (fighter) => fighter.fighter_id)
  ranking_id: string;

  @Column({ type: 'int' })
  @Field(() => Int, { description: 'Ranking position of the fighter' })
  ranking_position: number;

  @Column({ type: 'uuid' })
  @Field(() => String, { description: 'id of the fighter' })
  fighter_id: string;
}
