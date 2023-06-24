import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field(() => String, { description: 'event name' })
  event_name: string;

  @IsDate()
  @Field(() => Date, { description: 'event date' })
  event_date: Date;

  @Field(() => String, { description: 'event location' })
  event_location: string;

  @Field(() => String, { description: 'How made the promotion' })
  event_promotion: string;
}
