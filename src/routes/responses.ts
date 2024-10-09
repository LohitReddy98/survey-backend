// src/routes/responses.ts
import express from 'express';
import {
  submitResponse,
  getResponsesForSurvey,
} from '../controllers/responseController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post(
  '/:surveyId',
  authenticate,
  authorize(['patient']),
  submitResponse
);
router.get(
  '/:surveyId',
  authenticate,
  authorize(['doctor']),
  getResponsesForSurvey
);

export default router;
