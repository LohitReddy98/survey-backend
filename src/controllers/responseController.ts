// src/controllers/responseController.ts
import { Request, Response } from 'express';
import db from '../models';
import { AuthenticatedRequest } from '../types';

export const submitResponse = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { surveyId } = req.params;
  const { response } = req.body;
  console.log({ surveyId, patientId: req.user.userId })
  try {
    // Check if survey is assigned to patient
    const assignment = await db.SurveyAssignment.findOne({
      where: { surveyId:parseInt(surveyId), patientId: req.user.userId },
    });
    if (!assignment) {
      return res
        .status(400)
        .json({ error: 'Survey not assigned to this patient' });
    }

    // Check if response already exists
    const existingResponse = await db.SurveyResponse.findOne({
      where: { surveyId, patientId: req.user.userId },
    });
    if (existingResponse) {
      return res
        .status(400)
        .json({ error: 'Response already submitted for this survey' });
    }

    await db.SurveyResponse.create({
      surveyId: Number(surveyId),
      patientId: req.user.userId,
      response,
    });
    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getResponsesForSurvey = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { surveyId } = req.params;
  try {
    const responses = await db.SurveyResponse.findAll({
      where: { surveyId },
      include: [
        {
          model: db.Patient,
          attributes: ['id'],
          include: [
            {
              model: db.User,
              attributes: ['username', 'email'],
            },
          ],
        },
      ],
    });
    res.json(responses);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
