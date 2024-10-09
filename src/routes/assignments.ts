// src/routes/assignments.ts
import express from 'express';
import {
  assignSurvey,
  getAssignedSurveysForPatient,
  getAssignedPatientsForSurvey,
  getAllPatients,
} from '../controllers/assignmentController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post(
  '/:surveyId',
  authenticate,
  authorize(['doctor']),
  assignSurvey
);
router.get(
  '/my',
  authenticate,
  authorize(['patient']),
  getAssignedSurveysForPatient
);
router.get(
  '/survey/:surveyId',
  authenticate,
  authorize(['doctor']),
  getAssignedPatientsForSurvey
);
router.get(
  '/patients/:surveyId',
  authenticate,
  authorize(['doctor', 'patient']),
  getAllPatients
);

export default router;
