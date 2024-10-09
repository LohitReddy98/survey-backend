// src/models/index.ts
import { Sequelize } from 'sequelize';
import { config } from '../config/database';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Import models
import userModel from './user';
import patientModel from './patient';
import doctorModel from './doctor';
import surveyModel from './survey';
import surveyQuestionModel from './surveyQuestion';
import surveyAssignmentModel from './surveyAssignment';
import surveyResponseModel from './surveyResponse';

const db = {
  User: userModel(sequelize),
  Patient: patientModel(sequelize),
  Doctor: doctorModel(sequelize),
  Survey: surveyModel(sequelize),
  SurveyQuestion: surveyQuestionModel(sequelize),
  SurveyAssignment: surveyAssignmentModel(sequelize),
  SurveyResponse: surveyResponseModel(sequelize),
};

// Define associations
db.User.hasOne(db.Patient, { foreignKey: 'id' });
db.User.hasOne(db.Doctor, { foreignKey: 'id' });

db.Patient.belongsTo(db.User, { foreignKey: 'id' });
db.Doctor.belongsTo(db.User, { foreignKey: 'id' });

db.Doctor.hasMany(db.Survey, { foreignKey: 'createdBy' });
db.Survey.belongsTo(db.Doctor, { foreignKey: 'createdBy' });

db.Survey.hasMany(db.SurveyQuestion, { foreignKey: 'surveyId', as: 'questions' });
db.SurveyQuestion.belongsTo(db.Survey, { foreignKey: 'surveyId' });

db.Survey.belongsToMany(db.Patient, {
  through: db.SurveyAssignment,
  foreignKey: 'surveyId',
});
db.Patient.belongsToMany(db.Survey, {
  through: db.SurveyAssignment,
  foreignKey: 'patientId',
});

db.Survey.hasMany(db.SurveyResponse, { foreignKey: 'surveyId' });
db.Patient.hasMany(db.SurveyResponse, { foreignKey: 'patientId' });

db.SurveyResponse.belongsTo(db.Survey, { foreignKey: 'surveyId' });
db.SurveyResponse.belongsTo(db.Patient, { foreignKey: 'patientId' });

export default db;
