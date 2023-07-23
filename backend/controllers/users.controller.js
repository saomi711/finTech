const User = require('../models/users.model');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error getting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await User.update(req.body, {
      where: { id: userId },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedRows[0]);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedRowsCount = await User.destroy({ where: { id: userId } });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
