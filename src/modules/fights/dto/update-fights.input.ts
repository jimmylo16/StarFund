import { CreateFightsInput } from './create-fights.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFightsInput extends PartialType(CreateFightsInput) {
  @Field(() => String)
  fight_id: string;
}
