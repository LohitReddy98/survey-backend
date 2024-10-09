
import 'dotenv/config';

export const config = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'survey_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  },
};
