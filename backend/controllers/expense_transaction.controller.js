const ExpenseTransaction = require('../models/expense_transaction.model');
const Expense = require('../models/expense.model');

const isExpenseBelongsToUser = async (userId, expenseId) => {
  try {
    const expense = await Expense.findOne({ where: { id: expenseId, user_id: userId } });
    return !!expense;
  } catch (err) {
    console.error('Error checking expense ownership:', err);
    return false;
  }
};

exports.createExpenseTransaction = async (req, res) => {
  const expenseId = req.params.expense_id;
  const userId = req.userId;
  const isValidExpense = await isExpenseBelongsToUser(userId, expenseId);

  if (!isValidExpense) {
    return res.status(403).json({ message: 'You are not authorized to create a transaction for this expense.' });
  }

  try {
    const expenseTransactionData = { ...req.body, expense_id: expenseId };
    const expenseTransaction = await ExpenseTransaction.create(expenseTransactionData);
    res.status(201).json(expenseTransaction);
  } catch (err) {
    console.error('Error creating expense transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllExpenseTransactions = async (req, res) => {
  const expenseId = req.params.expense_id;
  const userId = req.userId;
  const isValidExpense = await isExpenseBelongsToUser(userId, expenseId);

  if (!isValidExpense) {
    return res.status(403).json({ message: 'You are not authorized to get transactions for this expense.' });
  }

  try {
    const expenseTransactions = await ExpenseTransaction.findAll({ where: { expense_id: expenseId } });
    res.json(expenseTransactions);
  } catch (err) {
    console.error('Error getting expense transactions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getExpenseTransactionById = async (req, res) => {
  const expenseId = req.params.expense_id;
  const expenseTransactionId = req.params.id;
  const userId = req.userId;
  const isValidExpense = await isExpenseBelongsToUser(userId, expenseId);

  if (!isValidExpense) {
    return res.status(403).json({ message: 'You are not authorized to get this transaction.' });
  }

  try {
    const expenseTransaction = await ExpenseTransaction.findOne({
      where: { id: expenseTransactionId, expense_id: expenseId }
    });
    if (!expenseTransaction) {
      return res.status(404).json({ message: 'Expense transaction not found' });
    }
    res.json(expenseTransaction);
  } catch (err) {
    console.error('Error getting expense transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExpenseTransaction = async (req, res) => {
  const expenseId = req.params.expense_id;
  const expenseTransactionId = req.params.id;
  const userId = req.userId; 
  const isValidExpense = await isExpenseBelongsToUser(userId, expenseId);

  if (!isValidExpense) {
    return res.status(403).json({ message: 'You are not authorized to update this transaction.' });
  }

  try {
    const [updatedRowsCount, updatedRows] = await ExpenseTransaction.update(req.body, {
      where: { id: expenseTransactionId, expense_id: expenseId },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Expense transaction not found' });
    }
    res.json(updatedRows[0]);
  } catch (err) {
    console.error('Error updating expense transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteExpenseTransaction = async (req, res) => {
  const expenseId = req.params.expense_id;
  const expenseTransactionId = req.params.id;
  const userId = req.userId; 
  const isValidExpense = await isExpenseBelongsToUser(userId, expenseId);

  if (!isValidExpense) {
    return res.status(403).json({ message: 'You are not authorized to delete this transaction.' });
  }

  try {
    const deletedRowsCount = await ExpenseTransaction.destroy({
      where: { id: expenseTransactionId, expense_id: expenseId }
    });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: 'Expense transaction not found' });
    }
    res.json({ message: 'Expense transaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting income transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
