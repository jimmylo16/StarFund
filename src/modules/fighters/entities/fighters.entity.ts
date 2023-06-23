import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Fighter {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the fighter' })
  fighter_id: string;

  @Column()
  @Field(() => String, { description: 'first name of the fighter' })
  fighter_name: string;

  @Column()
  @Field(() => String, { description: 'nickname of the fighter' })
  fighter_nickname: string;

  @Column()
  @Field(() => Date, { description: 'birthdate of the fighter' })
  fighter_birthdate: Date;

  @Column()
  @Field(() => String, { description: 'Nationaitly of the fighter' })
  fighter_nationality: string;

  @Column()
  @Field(() => String, { description: 'Weight Class of the fighter' })
  fighter_weight_class: string;
}
