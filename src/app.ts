

import express from 'express';
import { sequelize } from './models';
import cors from 'cors'; 


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

import authRoutes from './routes/auth';
import surveyRoutes from './routes/surveys';
import responseRoutes from './routes/responses';
import assignmentRoutes from './routes/assignments';


app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/assignments', assignmentRoutes);


sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log('Models synchronized.');
    app.listen(port,'0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err: Error) => console.error('Error: ' + err));
