import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ranking' })
@ObjectType()
export class Ranking {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the ranking' })
  ranking_id: string;

  @Column({ type: 'int' })
  @Field(() => Int, { description: 'Ranking position of the fighter' })
  ranking_position: number;

  @Column({ type: 'uuid' })
  @Field(() => String, { description: 'id of the fighter' })
  fighter_id: string;
}
