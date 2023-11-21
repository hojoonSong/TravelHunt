import { Question } from 'src/question/entity/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionId: number;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;

  @Column()
  optionText: string;

  @Column()
  score: number;

  @Column({ nullable: true })
  conditionalNextQuestionId: number | null;
}
