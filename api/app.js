import dotenv from 'dotenv';
import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import jobsRouter from './routes/jobs.js';
import authRouter from './routes/auth.js';
import connectDB from './db/connect.js';
import authenticateUser from './middleware/authentication.js';

// initialize app
const app = express();

// import credentials
dotenv.config({path: '.env'});

// middleware
app.use(express.json());

// routers
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
app.use('/api/v1/auth', authRouter);

// error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;
const connectionStr = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`

const start = async () => {
  try {
    await connectDB(connectionStr);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
