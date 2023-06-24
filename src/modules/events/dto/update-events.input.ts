import { CreateEventInput } from './create-Events.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => String)
  event_id: string;
}
