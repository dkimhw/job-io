import { StatusCodes } from "http-status-codes";
import User from '../models/User.js';
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

const register = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: {name: user.getName() }, token });
  } catch (err) {
    next(err);
  }

}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Please provide email and password.');
    }

    // check user
    const user = await User.findOne({ email });
    if (!user) throw new UnauthenticatedError('Invalid credentials.');

    // compare password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid credentials.');

    // send back reponse
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.getName() }, token, status: 'success'});
  } catch (err) {
    return next(err);
  }

}

export default {
  register,
  login
}
