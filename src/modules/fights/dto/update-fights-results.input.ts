import { CreateFightsInput } from './create-fights.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateFightsResultsInput extends OmitType(CreateFightsInput, [
  'event_id',
  'fighter1_id',
  'fighter2_id',
]) {}
