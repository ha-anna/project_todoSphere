import mongoose from 'mongoose';
import { User } from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    // deal with no user
  }
};

const registerUser = async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ error: '이미 가입된 회원입니다' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: '유효한 이메일 형식이 아닙니다' });
  }

  if (password !== passwordConfirmation) {
    return res.status(400).json({ error: '비밀번호를 일치하지 않습니다' });
  }

  try {
    bcrypt.genSalt(+process.env.BCRYPT_SALT, function (err, salt) {
      if (err) {
        throw err;
      }
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          throw err;
        }
        await User.create({ email: email, password: hash });
        res.json();
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {};

export { loginUser, registerUser, getUser };
