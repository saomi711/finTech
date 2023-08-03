const ExpenseTransaction = require('../models/expense_transaction.model');

exports.createExpenseTransaction = async (req, res) => {
  try {
    const expenseTransaction = await ExpenseTransaction.create(req.body);
    res.status(201).json(expenseTransaction);
  } catch (err) {
    console.error('Error creating expense transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllExpenseTransactions = async (req, res) => {
  try {
    const expenseTransactions = await ExpenseTransaction.findAll();
    res.json(expenseTransactions);
  } catch (err) {
    console.error('Error getting expense transactions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getExpenseTransactionById = async (req, res) => {
  const transactionId = req.params.id;
  try {
    const expenseTransaction = await ExpenseTransaction.findByPk(transactionId);
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
  const transactionId = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await ExpenseTransaction.update(req.body, {
      where: { id: transactionId },
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
  const transactionId = req.params.id;
  try {
    const deletedRowsCount = await ExpenseTransaction.destroy({ where: { id: transactionId } });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: 'Expense transaction not found' });
    }
    res.json({ message: 'Expense transaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting expense transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
