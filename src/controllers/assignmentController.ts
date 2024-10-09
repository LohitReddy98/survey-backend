
import { Request, Response } from 'express';
import db from '../models';
import { AuthenticatedRequest } from '../types';

export const assignSurvey = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { surveyId } = req.params;
  const { patientId } = req.body;
  try {
    const assignment = await db.SurveyAssignment.create({
      surveyId: Number(surveyId),
      patientId,
      doctorId: req.user.userId,
    });
    res.status(201).json({ message: 'Survey assigned successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAssignedSurveysForPatient = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    
    const assignments = await db.SurveyAssignment.findAll({
      where: { patientId: req.user.userId },
      attributes: ['surveyId'], 
    });

    
    const surveyIds = assignments.map((assignment) => assignment.surveyId);

    
    if (surveyIds.length === 0) {
      return res.json({ surveys: [] });
    }

    
    const surveys = await db.Survey.findAll({
      where: { id: surveyIds },
      attributes: ['id', 'title'], 
    });

    
    const responses = await db.SurveyResponse.findAll({
      where: { surveyId: surveyIds, patientId: req.user.userId },
      attributes: ['surveyId'],
    });

    const submittedSurveyIds = new Set(responses.map((response) => response.surveyId));

    
    const formattedSurveys = surveys.map((survey) => ({
      surveyId: survey.id,
      title: survey.title,
      submitted: submittedSurveyIds.has(survey.id), 
    }));

    
    res.json({ surveys: formattedSurveys });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const getAssignedPatientsForSurvey = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { surveyId } = req.params;
  try {
    const assignments = await db.SurveyAssignment.findAll({
      where: { surveyId },
      include: [
        {
          model: db.Patient,
          include: [
            {
              model: db.User,
              attributes: ['username', 'email'],
            },
          ],
        },
      ],
    });
    const patients = assignments.map((assignment) => assignment.Patient);
    res.json(patients);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPatients = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { surveyId } = req.params;
  try {
    
    const patients = await db.Patient.findAll({
      attributes: ['id', 'firstName', 'lastName'], 
    });

    
    const assignments = await db.SurveyAssignment.findAll({
      where: {
        surveyId: surveyId,
      },
      attributes: ['patientId'],
    });

    
    const assignedPatientIds = new Set(assignments.map(a => a.patientId));

    
    const formattedPatients = patients.map(patient => ({
      patientId: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      assigned: assignedPatientIds.has(patient.id),
    }));

    res.json(formattedPatients);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
