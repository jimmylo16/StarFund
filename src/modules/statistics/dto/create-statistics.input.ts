import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateStatisticsInput {
  @IsNumber()
  @Field(() => Int, { description: 'total wins of the fighter' })
  total_wins: number;

  @IsNumber()
  @Field(() => Int, { description: 'total losses of the fighter' })
  total_losses: number;

  @IsNumber()
  @Field(() => Int, { description: 'total draws of the fighter' })
  total_draws: number;

  @IsNumber()
  @Field(() => Int, { description: 'total draws of the fighter' })
  knockout_wins: number;

  @IsNumber()
  @Field(() => Int, { description: 'total draws of the fighter' })
  submission_wins: number;

  @IsNumber()
  @Field(() => Int, { description: 'total draws of the fighter' })
  decision_wins: number;
}
