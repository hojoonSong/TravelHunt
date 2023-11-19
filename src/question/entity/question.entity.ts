import { Survey } from 'src/survey/entity/survey.entity';
import { Option } from 'src/option/entity/option.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey;

  @Column()
  questionText: string;

  @Column()
  questionType: string;

  @Column({ nullable: true })
  nextQuestionId: number | null;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];
}
