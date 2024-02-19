import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router as todosRoutes } from './routes/todos.js';

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());

app.use('/api/todos', todosRoutes);

app.get('/', async (_req, res, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'healthy',
    timestamp: new Date(Date.now()).toLocaleString()
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error.message;
    res.status(503).send(healthcheck);
  }
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('listening for requests on ' + PORT);
  });
});
