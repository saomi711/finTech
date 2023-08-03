const BankAccount = require('../models/bank_account.model');

exports.createBankAccount = async (req, res) => {
  try {
    const bankAccount = await BankAccount.create(req.body);
    res.status(201).json(bankAccount);
  } catch (err) {
    console.error('Error creating bank account:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllBankAccounts = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.findAll();
    res.json(bankAccounts);
  } catch (err) {
    console.error('Error getting bank accounts:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBankAccountById = async (req, res) => {
  const bankAccountId = req.params.id;
  try {
    const bankAccount = await BankAccount.findByPk(bankAccountId);
    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }
    res.json(bankAccount);
  } catch (err) {
    console.error('Error getting bank account:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBankAccount = async (req, res) => {
  const bankAccountId = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await BankAccount.update(req.body, {
      where: { id: bankAccountId },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Bank account not found' });
    }
    res.json(updatedRows[0]);
  } catch (err) {
    console.error('Error updating bank account:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBankAccount = async (req, res) => {
  const bankAccountId = req.params.id;
  try {
    const deletedRowsCount = await BankAccount.destroy({ where: { id: bankAccountId } });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: 'Bank account not found' });
    }
    res.json({ message: 'Bank account deleted successfully' });
  } catch (err) {
    console.error('Error deleting bank account:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
