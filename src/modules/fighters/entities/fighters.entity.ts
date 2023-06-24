import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fights } from 'src/modules/fights/entities/fights.entity';
import { Statistics } from 'src/modules/statistics/entities/statistics.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'fighter' })
@ObjectType()
export class Fighter {
  @PrimaryGeneratedColumn('uuid')
  @OneToOne(() => Statistics, (statistic) => statistic.fighter_id)
  @OneToMany(() => Fights, (fights) => fights.fighter1_id)
  @OneToMany(() => Fights, (fights) => fights.fighter2_id)
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
