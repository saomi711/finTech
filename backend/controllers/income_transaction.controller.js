const IncomeTransaction = require('../models/income_transaction.model');
const Income = require('../models/income.model');

const isIncomeBelongsToUser = async (userId, incomeId) => {
  try {
    const income = await Income.findOne({ where: { id: incomeId, user_id: userId } });
    return !!income;
  } catch (err) {
    console.error('Error checking income ownership:', err);
    return false;
  }
};

exports.createIncomeTransaction = async (req, res) => {
  const incomeId = req.params.income_id;
  const userId = req.userId;
  const isValidIncome = await isIncomeBelongsToUser(userId, incomeId);

  if (!isValidIncome) {
    return res.status(403).json({ message: 'You are not authorized to create a transaction for this income.' });
  }

  try {
    const incomeTransactionData = { ...req.body, income_id: incomeId };
    const incomeTransaction = await IncomeTransaction.create(incomeTransactionData);
    res.status(201).json(incomeTransaction);
  } catch (err) {
    console.error('Error creating income transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllIncomeTransactions = async (req, res) => {
  const incomeId = req.params.income_id;
  const userId = req.userId;
  const isValidIncome = await isIncomeBelongsToUser(userId, incomeId);

  if (!isValidIncome) {
    return res.status(403).json({ message: 'You are not authorized to get transactions for this income.' });
  }

  try {
    const incomeTransactions = await IncomeTransaction.findAll({ where: { income_id: incomeId } });
    res.json(incomeTransactions);
  } catch (err) {
    console.error('Error getting income transactions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getIncomeTransactionById = async (req, res) => {
  const incomeId = req.params.income_id;
  const incomeTransactionId = req.params.id;
  const userId = req.userId;
  const isValidIncome = await isIncomeBelongsToUser(userId, incomeId);

  if (!isValidIncome) {
    return res.status(403).json({ message: 'You are not authorized to get this transaction.' });
  }

  try {
    const incomeTransaction = await IncomeTransaction.findOne({
      where: { id: incomeTransactionId, income_id: incomeId }
    });
    if (!incomeTransaction) {
      return res.status(404).json({ message: 'Income transaction not found' });
    }
    res.json(incomeTransaction);
  } catch (err) {
    console.error('Error getting income transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateIncomeTransaction = async (req, res) => {
  const incomeId = req.params.income_id;
  const incomeTransactionId = req.params.id;
  const userId = req.userId; 
  const isValidIncome = await isIncomeBelongsToUser(userId, incomeId);

  if (!isValidIncome) {
    return res.status(403).json({ message: 'You are not authorized to update this transaction.' });
  }

  try {
    const [updatedRowsCount, updatedRows] = await IncomeTransaction.update(req.body, {
      where: { id: incomeTransactionId, income_id: incomeId },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Income transaction not found' });
    }
    res.json(updatedRows[0]);
  } catch (err) {
    console.error('Error updating income transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteIncomeTransaction = async (req, res) => {
  const incomeId = req.params.income_id;
  const incomeTransactionId = req.params.id;
  const userId = req.userId; 
  const isValidIncome = await isIncomeBelongsToUser(userId, incomeId);

  if (!isValidIncome) {
    return res.status(403).json({ message: 'You are not authorized to delete this transaction.' });
  }

  try {
    const deletedRowsCount = await IncomeTransaction.destroy({
      where: { id: incomeTransactionId, income_id: incomeId }
    });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: 'Income transaction not found' });
    }
    res.json({ message: 'Income transaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting income transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
