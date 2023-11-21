import { UpdateSurveyInput } from './types/update.survey.input';
import { CreateSurveyInput } from './types/create-survey.input';
import { Survey } from './entity/survey.entity';
import { SurveyRepository } from './survey.repositroy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SurveyService {
  constructor(private surveyRepository: SurveyRepository) {}

  async createSurvey(createSurveyInput: CreateSurveyInput): Promise<Survey> {
    const survey = await this.surveyRepository.create(createSurveyInput);
    const savedSurvey = await this.surveyRepository.save(survey);

    if (createSurveyInput.questions) {
      for (const questionInput of createSurveyInput.questions) {
        questionInput.surveyId = savedSurvey.id;
      }
    }

    if (createSurveyInput.responses) {
      for (const responseInput of createSurveyInput.responses) {
        responseInput.surveyId = savedSurvey.id;
      }
    }

    return this.surveyRepository.findOne(savedSurvey.id, [
      'questions',
      'responses',
    ]);
  }

  async getSurvey(id: number): Promise<Survey | undefined> {
    return this.surveyRepository.findOne(id);
  }

  async updateSurvey(
    id: number,
    updateSurveyInput: UpdateSurveyInput,
  ): Promise<Survey> {
    return this.surveyRepository.update(id, updateSurveyInput);
  }

  async deleteSurvey(id: number): Promise<void> {
    return this.surveyRepository.delete(id);
  }
}
