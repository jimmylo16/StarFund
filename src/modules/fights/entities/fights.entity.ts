import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Event } from 'src/modules/events/entities/event.entity';
import { Fighter } from 'src/modules/fighters/entities/fighters.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'fights' })
@ObjectType()
export class Fights {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'fight id' })
  fight_id: string;

  @Field(() => String, { description: 'id of the event' })
  @ManyToOne(() => Event, (event) => event.event_id)
  event_id: string;

  @Column({ type: 'text' })
  @Field(() => String, { description: 'Result of the fight' })
  fight_result: 'win' | 'lose' | 'draw';

  @Column({ type: 'int' })
  @Field(() => Int, { description: 'Number of rounds' })
  fight_rounds: number;

  @Column({ type: 'int' })
  @Field(() => Int, { description: 'Duration Of fights in seconds' })
  fight_duration: number;

  @Field(() => String, { description: 'id of the firs fighter' })
  @ManyToOne(() => Fighter, (fighter) => fighter.fighter_id)
  fighter1_id: string;

  @Field(() => String, { description: 'id of the second fighter' })
  @ManyToOne(() => Fighter, (fighter) => fighter.fighter_id)
  fighter2_id: string;
}
