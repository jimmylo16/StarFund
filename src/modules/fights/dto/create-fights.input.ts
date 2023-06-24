import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateFightsInput {
  @IsUUID()
  @Field(() => String, { description: 'id of the event' })
  event_id: string;

  @Field(() => String, { description: 'Result of the fight' })
  fight_result: 'win' | 'lose' | 'draw';

  @Field(() => Int, { description: 'Number of rounds' })
  fight_rounds: number;

  @Field(() => Int, { description: 'Duration Of fights in seconds' })
  fight_duration: number;

  @Field(() => String, { description: 'id of the firs fighter' })
  fighter1_id: string;

  @Field(() => String, { description: 'id of the second fighter' })
  fighter2_id: string;
}
