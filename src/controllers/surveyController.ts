// src/controllers/surveyController.ts
import { Request, Response } from 'express';
import db from '../models';
import { AuthenticatedRequest } from '../types';

export const createSurvey = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, questions } = req.body;
  try {
    const survey = await db.Survey.create({
      title,
      description,
      createdBy: req.user.userId,
    });
    for (const question of questions) {
      await db.SurveyQuestion.create({
        surveyId: survey.id,
        questionText: question.questionText,
        questionType: question.questionType,
        options: question.options,
        isRequired: question.isRequired,
      });
    }
    res
      .status(201)
      .json({ message: 'Survey created successfully', surveyId: survey.id });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getSurveys = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const surveys = await db.Survey.findAll({
      include: [
        {
          model: db.SurveyQuestion,
          as: 'questions',
        },
      ],
    });
    res.json(surveys);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getSurveyById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const survey = await db.Survey.findByPk(req.params.id, {
      include: [
        {
          model: db.SurveyQuestion,
          as: 'questions',
        },
      ],
    });
    if (!survey) return res.status(404).json({ error: 'Survey not found' });
    res.json(survey);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSurvey = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, questions } = req.body;
  try {
    const survey = await db.Survey.findByPk(req.params.id);
    if (!survey) return res.status(404).json({ error: 'Survey not found' });

    await survey.update({ title, description });

    // Delete existing questions
    await db.SurveyQuestion.destroy({ where: { surveyId: survey.id } });

    // Add updated questions
    for (const question of questions) {
      await db.SurveyQuestion.create({
        surveyId: survey.id,
        questionText: question.questionText,
        questionType: question.questionType,
        options: question.options,
        isRequired: question.isRequired,
      });
    }

    res.json({ message: 'Survey updated successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSurvey = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const survey = await db.Survey.findByPk(req.params.id);
    if (!survey) return res.status(404).json({ error: 'Survey not found' });

    await survey.destroy();
    res.json({ message: 'Survey deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
