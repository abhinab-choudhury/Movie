import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect_db } from './db/db-index.js';
const app = express();

import authRoutes from './routes/auth.routes.js';
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());

connect_db().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log('Server running on port:', process.env.PORT);
  });

  app.get('/health', (req, res) => {
    res.status(200).json({ message: 'healthy server' });
  });
  app.use('/api/v1/auth',authRoutes);
});
