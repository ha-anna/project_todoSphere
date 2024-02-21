import express from 'express';
import {
  loginUser,
  registerUser,
  getUser,
} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.get('/user/:id', getUser);

export { router };
