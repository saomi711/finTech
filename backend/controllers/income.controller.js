const Income = require('../models/income.model');

exports.createIncome = async (req, res) => {
  try {
    const userId = req.userId; 
    req.body.user_id = userId; 
    console.log(userId);
    const income = await Income.create(req.body);
    res.status(201).json(income);
  } catch (err) {
    console.error('Error creating income:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllIncomes = async (req, res) => {
  try {
    const userId = req.userId; 
    console.log(userId);
    const incomes = await Income.findAll({ where: { user_id: userId } });
    res.json(incomes);
  } catch (err) {
    console.error('Error getting incomes:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getIncomeById = async (req, res) => {
  const incomeId = req.params.id;
  try {
    const userId = req.userId; 
    const income = await Income.findOne({ where: { id: incomeId, user_id: userId } });
    if (!income) {
      return res.status(404).json({ message: 'Income not found or does not belong to the authenticated user' });
    }
    res.json(income);
  } catch (err) {
    console.error('Error getting income:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateIncome = async (req, res) => {
  const incomeId = req.params.id;
  try {
    const userId = req.userId; 
    const income = await Income.findOne({ where: { id: incomeId, user_id: userId } });
    if (!income) {
      return res.status(404).json({ message: 'Income not found or does not belong to the authenticated user' });
    }

    const [updatedRowsCount, updatedRows] = await Income.update(req.body, {
      where: { id: incomeId },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json(updatedRows[0]);
  } catch (err) {
    console.error('Error updating income:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteIncome = async (req, res) => {
  const incomeId = req.params.id;
  try {
    const userId = req.userId;
    const income = await Income.findOne({ where: { id: incomeId, user_id: userId } });
    if (!income) {
      return res.status(404).json({ message: 'Income not found or does not belong to the authenticated user' });
    }

    await Income.destroy({ where: { id: incomeId } });
    res.json({ message: 'Income deleted successfully' });
  } catch (err) {
    console.error('Error deleting income:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
