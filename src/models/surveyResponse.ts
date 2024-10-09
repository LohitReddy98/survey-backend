// src/models/surveyResponse.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class SurveyResponse extends Model {}

  SurveyResponse.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      surveyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Survey',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      patientId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Patient',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      response: { type: DataTypes.JSON },
    },
    {
      tableName: 'SurveyResponse',
      sequelize,
      timestamps: true,
    }
  );

  return SurveyResponse;
};
