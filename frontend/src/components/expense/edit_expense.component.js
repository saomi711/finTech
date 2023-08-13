import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FormControl,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  List,
  ListItem,
} from '@material-ui/core';
import { useExpenseContext } from '../../contexts/expense.context';
import ExpenseService from '../../services/expense.service';
import { useExpenseData } from '../../hooks/useExpenseData';

const EditExpense = () => {
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const [ expenseData, setExpenseData ] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [transactionData, setTransactionData] = useState({
    date: '',
    amount: '',
    note: '',
  });

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await ExpenseService.getExpenseById(expenseId);
        console.log(response.data);
        const expense = response.data;
        const transactionResponse = await ExpenseService.getExpenseTransactions(expenseId);
        const transactions = transactionResponse.data;
        const updatedResponse =  { ...expense, transactions };
        setExpenseData(updatedResponse);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };
    fetchExpenseData();
  }, [expenseId, rerender]);

  const handleChangeExpense = async (e) => {
    const { name, value } = e.target;
    try {
      await ExpenseService.editExpense(expenseId, { [name]: value });
      //const response = await IncomeService.getIncomeById(incomeId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error saving expense data:', error);
    }
  };

  const handleChangeTransaction = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddTransaction = async () => {
    try {
      await ExpenseService.addExpenseTransaction(expenseId, transactionData);
      //setIncomeData(response.data);
      setTransactionData({
        date: '',
        amount: '',
        note: '',
      });
      setRerender(!rerender);
    } catch (error) {
      console.error('Error adding expense transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await ExpenseService.deleteIncomeTransaction(expenseId, transactionId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error deleting expense transaction:', error);
    }
  };

  const handleSaveExpense = async () => {
    try {
      //await IncomeService.deleteIncomeTransaction(incomeData.id, transactionId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error deleting expense transaction:', error);
    }
  };

  if (!expenseData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSaveExpense} style={{ width: '80%' }}>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2>Edit Expense</h2>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
              label="Title"
              name="title"
              value={expenseData.title}
              onChange={handleChangeExpense}
              />
            </FormControl>
          </Grid>
        
      

      {/* Other income fields */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Category"
                name="category"
                value={expenseData?.category || ''}
                onChange={handleChangeExpense}
                select
              >
                <MenuItem value="One Time">One Time</MenuItem>
                <MenuItem value="Periodic">Periodic</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          {expenseData.category === 'Periodic' && (
          <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Period"
                name="period"
                value={expenseData?.period || ''}
                onChange={handleChangeExpense}
                select
              >
                <MenuItem value="Yearly">Yearly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Start Date"
                name="start"
                type="date"
                value={expenseData?.start || ''}
                onChange={handleChangeExpense}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="End Date"
                name="end"
                type="date"
                value={expenseData?.end || ''}
                onChange={handleChangeExpense}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          </>
          )}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Institution"
                name="institution"
                value={expenseData?.institution || ''}
                onChange={handleChangeExpense}
              />
            </FormControl>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveExpense}
          >
            Save Expense
          </Button>
        </Grid>
      </form>
    </div>

    {expenseData.category === 'Periodic' && (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleAddTransaction} style={{ width: '80%' }}>

      <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2>Add Transaction</h2>
          </Grid>

      {/* Date */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Date"
                type="date"
                name="date"
                value={transactionData.date}
                onChange={handleChangeTransaction}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={transactionData.amount}
                onChange={handleChangeTransaction}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Note"
                name="note"
                value={transactionData.note}
                onChange={handleChangeTransaction}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" >
              Add Transaction
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
    </>
    )}


    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12}>
        <h2>Expense Transactions</h2>
      </Grid>

      <List>
        {expenseData?.transactions?.map((transaction) => (
          <Grid item xs={12}>
          <ListItem key={transaction.id}>
            Date: {transaction.date} | Amount: {transaction.amount} | Note: {transaction.note}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteTransaction(transaction.id)}
            >
              Delete
            </Button>
          </ListItem>
          </Grid>
        ))}
      </List>
    </Grid>
    </div>
    </>
  );
};

export default EditExpense;
