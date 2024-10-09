// src/controllers/assignmentController.ts
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
    // Fetch all assignments for the patient to get the survey IDs
    const assignments = await db.SurveyAssignment.findAll({
      where: { patientId: req.user.userId },
      attributes: ['surveyId'], // Only fetch the surveyId attribute
    });

    // Extract the survey IDs from the assignments
    const surveyIds = assignments.map((assignment) => assignment.surveyId);

    // If no surveys are assigned, return an empty array
    if (surveyIds.length === 0) {
      return res.json({ surveys: [] });
    }

    // Fetch survey details for each assigned survey
    const surveys = await db.Survey.findAll({
      where: { id: surveyIds },
      attributes: ['id', 'title'], // Fetch only id (surveyId) and title
    });

    // Check which surveys have been submitted by the patient
    const responses = await db.SurveyResponse.findAll({
      where: { surveyId: surveyIds, patientId: req.user.userId },
      attributes: ['surveyId'],
    });

    const submittedSurveyIds = new Set(responses.map((response) => response.surveyId));

    // Format the surveys to include id, title, and submitted status
    const formattedSurveys = surveys.map((survey) => ({
      surveyId: survey.id,
      title: survey.title,
      submitted: submittedSurveyIds.has(survey.id), // Add submitted field
    }));

    // Send back the array of surveys with surveyId, title, and submitted
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
// New endpoint to get all patients with only name and patientId
export const getAllPatients = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { surveyId } = req.params;
  try {
    // Fetch all patients
    const patients = await db.Patient.findAll({
      attributes: ['id', 'firstName', 'lastName'], // Include any additional fields you need
    });

    // Fetch all assignments for the given surveyId
    const assignments = await db.SurveyAssignment.findAll({
      where: {
        surveyId: surveyId,
      },
      attributes: ['patientId'],
    });

    // Create a Set of patientIds who have been assigned the survey
    const assignedPatientIds = new Set(assignments.map(a => a.patientId));

    // Format the response
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
