import { ObjectType, Field } from '@nestjs/graphql';
import { Fights } from 'src/modules/fights/entities/fights.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'event' })
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => Fights, (fights) => fights.event_id)
  @Field(() => String, { description: 'id of the fighter' })
  event_id: string;

  @Column()
  @Field(() => String, { description: 'event name' })
  event_name: string;

  @Column()
  @Field(() => Date, { description: 'event date' })
  event_date: Date;

  @Column()
  @Field(() => String, { description: 'event location' })
  event_location: string;

  @Column()
  @Field(() => String, { description: 'How made the promotion' })
  event_promotion: string;
}
