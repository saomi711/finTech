const Goal = require('../models/goal.model');

exports.createGoal = async (req, res) => {
  try {
    const userId = req.userId; 
    req.body.user_id = userId; 
    console.log(userId);
    const goal = await Goal.create(req.body);
    res.status(201).json(goal);
  } catch (err) {
    console.error('Error creating goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllGoals = async (req, res) => {
  try {
    const userId = req.userId; 
    console.log(userId);
    const goals = await Goal.findAll({ where: { user_id: userId } });
    res.json(goals);
  } catch (err) {
    console.error('Error getting goals:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getGoalById = async (req, res) => {
  const goalId = req.params.id;
  try {
    const userId = req.userId; 
    const goal = await Goal.findOne({ where: { id: goalId, user_id: userId } });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found or does not belong to the authenticated user' });
    }
    res.json(goal);
  } catch (err) {
    console.error('Error getting goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateGoal = async (req, res) => {
  const goalId = req.params.id;
  try {
    const userId = req.userId;
    const goal = await Goal.findOne({ where: { id: goalId, user_id: userId } });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found or does not belong to the authenticated user' });
    }
    const [updatedRowsCount, updatedRows] = await Goal.update(req.body, {
      where: { id: goalId },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json(updatedRows[0]);
  } catch (err) {
    console.error('Error updating goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteGoal = async (req, res) => {
  const goalId = req.params.id;
  try {
    const userId = req.userId;
    const goal = await Goal.findOne({ where: { id: goalId, user_id: userId } });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found or does not belong to the authenticated user' });
    }
    const deletedRowsCount = await Goal.destroy({ where: { id: goalId } });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    console.error('Error deleting goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
