// src/app.ts
// import 'dotenv/config';
import express from 'express';
import { sequelize } from './models';
import cors from 'cors'; // Import the cors middleware


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
// Import routes
import authRoutes from './routes/auth';
import surveyRoutes from './routes/surveys';
import responseRoutes from './routes/responses';
import assignmentRoutes from './routes/assignments';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/assignments', assignmentRoutes);

// Test the database connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log('Models synchronized.');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err: Error) => console.error('Error: ' + err));
