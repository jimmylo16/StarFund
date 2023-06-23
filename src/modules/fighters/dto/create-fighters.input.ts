import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';

@InputType()
export class CreateFighterInput {
  @Field(() => String, { description: 'first name of the fighter' })
  fighter_name: string;

  @Field(() => String, { description: 'nickname of the fighter' })
  fighter_nickname: string;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { description: 'birthdate of the fighter' })
  fighter_birthdate: Date;

  @Field(() => String, { description: 'Nationaitly of the fighter' })
  fighter_nationality: string;

  @Field(() => String, { description: 'Weight Class of the fighter' })
  fighter_weight_class: string;
}
