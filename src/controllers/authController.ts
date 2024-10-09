
import { Request, Response } from 'express';
import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

export const register = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
    role,
    firstName,
    lastName,
    specialty,
    dateOfBirth,
    gender,
    phone,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    if (role === 'patient') {
      await db.Patient.create({
        id: user.id,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phone,
      });
    } else if (role === 'doctor') {
      await db.Doctor.create({
        id: user.id,
        firstName,
        lastName,
        specialty,
        phone,
      });
    }
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials1' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );
      res.json({ token,role: user.role });
    } else {
      res.status(400).json({ error: 'Invalid credentials2' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
