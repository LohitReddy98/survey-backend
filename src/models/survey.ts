
import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class Survey extends Model {}

  Survey.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT },
      createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Doctor',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
    },
    {
      tableName: 'Survey',
      sequelize,
      timestamps: true,
    }
  );

  return Survey;
};
