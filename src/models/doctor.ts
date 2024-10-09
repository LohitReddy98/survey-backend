// src/models/doctor.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class Doctor extends Model {}

  Doctor.init(
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
      specialty: { type: DataTypes.STRING(100) },
      phone: { type: DataTypes.STRING(20), unique: true },
    },
    {
      tableName: 'Doctor',
      sequelize,
      timestamps: true,
    }
  );

  return Doctor;
};
