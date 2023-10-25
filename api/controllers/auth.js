import { StatusCodes } from "http-status-codes";
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const register = async (req, res) => {
  // encrypt password
  // const { name, email, password } = req.body;
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const tempUser = {
  //   name, email, password: hashedPassword
  // }

  const user = await User.create({...req.body});
  res.status(StatusCodes.CREATED).json({ user });
}

const login = async (req, res) => {
  res.send('Login user');
}

export default {
  register,
  login
}
