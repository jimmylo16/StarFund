import { CreateFighterInput } from './create-fighters.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFighterInput extends PartialType(CreateFighterInput) {
  @Field(() => String)
  fighter_id: string;
}
