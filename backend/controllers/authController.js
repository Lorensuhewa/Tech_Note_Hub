import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';

// Register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);

    throw new Error('Please provide name, email and password');
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);

    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

// Login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);

    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);

    throw new Error('Invalid email or password');
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatches) {
    res.status(401);

    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});