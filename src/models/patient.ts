
import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class Patient extends Model {}

  Patient.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      firstName: { type: DataTypes.STRING(50), allowNull: false },
      lastName: { type: DataTypes.STRING(50), allowNull: false },
      dateOfBirth: { type: DataTypes.DATE },
      gender: { type: DataTypes.STRING(10) },
      phone: { type: DataTypes.STRING(20), unique: true },
    },
    {
      tableName: 'Patient',
      sequelize,
      timestamps: true,
    }
  );

  return Patient;
};
