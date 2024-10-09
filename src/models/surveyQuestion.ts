// src/models/surveyQuestion.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class SurveyQuestion extends Model {}

  SurveyQuestion.init(
    {
      questionId: {
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
      questionText: { type: DataTypes.TEXT, allowNull: false },
      questionType: { type: DataTypes.STRING(50), allowNull: false },
      options: { type: DataTypes.JSON },
      isRequired: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'SurveyQuestion',
      sequelize,
      timestamps: true,
    }
  );

  return SurveyQuestion;
};
