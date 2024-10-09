
import express from 'express';
import {
  createSurvey,
  getSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
} from '../controllers/surveyController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, authorize(['doctor']), createSurvey);
router.get('/', authenticate, authorize(['doctor', 'patient']), getSurveys);
router.get('/:id', authenticate, authorize(['doctor', 'patient']), getSurveyById);
router.put('/:id', authenticate, authorize(['doctor']), updateSurvey);
router.delete('/:id', authenticate, authorize(['doctor']), deleteSurvey);

export default router;
