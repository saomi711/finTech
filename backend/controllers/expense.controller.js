const Expense = require('../models/expense.model');

exports.createExpense = async (req, res) => {
  try {
    const userId = req.userId; 
    req.body.user_id = userId; 
    console.log(userId);
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (err) {
    console.error('Error creating expense:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const userId = req.userId; 
    console.log(userId);
    const expenses = await Expense.findAll({ where: { user_id: userId } });
    res.json(expenses);
  } catch (err) {
    console.error('Error getting expenses:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getExpenseById = async (req, res) => {
  const expenseId = req.params.id;
  try {
    const userId = req.userId; 
    const expense = await Expense.findOne({ where: { id: expenseId, user_id: userId } });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or does not belong to the authenticated user' });
    }
    res.json(expense);
  } catch (err) {
    console.error('Error getting expense:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExpense = async (req, res) => {
  const expenseId = req.params.id;
  try {
    const userId = req.userId; 
    const expense = await Expense.findOne({ where: { id: expenseId, user_id: userId } });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or does not belong to the authenticated user' });
    }

    const [updatedRowsCount, updatedRows] = await Expense.update(req.body, {
      where: { id: expenseId },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(updatedRows[0]);
  } catch (err) {
    console.error('Error updating expense:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;
  try {
    const userId = req.userId;
    const expense = await Expense.findOne({ where: { id: expenseId, user_id: userId } });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or does not belong to the authenticated user' });
    }

    await Expense.destroy({ where: { id: expenseId } });
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
