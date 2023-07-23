const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../config/config'); // Replace 'secretKey' with your actual secret key.
const User = require('../models/users.model');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered. Please login.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ username, email, password: hashedPassword });

    const payload = {
      userId: newUser.id, 
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
    res.status(201).json({ token });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    const payload = {
        userId: user.id, 
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
    res.json({ token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
