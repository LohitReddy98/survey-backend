
import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class SurveyAssignment extends Model {}

  SurveyAssignment.init(
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
      doctorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Doctor',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      assignedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: 'SurveyAssignment',
      sequelize,
      timestamps: false,
    }
  );

  return SurveyAssignment;
};
