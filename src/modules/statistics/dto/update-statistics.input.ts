import { CreateStatisticsInput } from './create-statistics.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStatisticsInput extends PartialType(CreateStatisticsInput) {
  @Field(() => String)
  statistics_id: string;
}
