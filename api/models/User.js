
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// import credentials
dotenv.config({path: '.env'});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a valid name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
  },
});

UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getName = function () {
  return this.name;
}

UserSchema.methods.createJWT = function() {
  const token = jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
}

UserSchema.methods.comparePassword = async function(canditatePassword) {
  const isMatch = bcrypt.compare(canditatePassword, this.password);

  return isMatch;
}

export default mongoose.model('User', UserSchema);
