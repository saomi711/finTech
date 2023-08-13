import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import ExpenseService from '../../services/expense.service';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState({
    title: '',
    category: 'One Time',
    period: '', 
    start: '10-10-1000',
    end: '10-10-1000',
    institution: '',
    date: '',
    amount: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      
      const expenseResponse = await ExpenseService.addExpense({
        title: expenseData.title,
        category: expenseData.category,
        period: expenseData.period,
        start: expenseData.start,
        end: expenseData.end,
        institution: expenseData.institution,
      });
      const expenseId = expenseResponse;
      
      const expenseTransactionData = {
          date: expenseData.date,
          amount: expenseData.amount,
          note: expenseData.note,
      };
    await ExpenseService.addExpenseTransaction(expenseId, expenseTransactionData);
      
      setExpenseData({
        title: '',
        category: 'One Time',
        period: '',
        start: '',
        end: '',
        institution: '',
        date: '',
        amount: '',
        note: '',
      });

    } catch (error) {
      console.error('Error adding expense:', error);
    }
    navigate("/expense");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleAddExpense} style={{ width: '80%' }}>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2>Add Expense</h2>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Title"
                name="title"
                value={expenseData.title}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Category"
                name="category"
                value={expenseData.category}
                onChange={handleChange}
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
                value={expenseData.period}
                onChange={handleChange}
                select
              >
                <MenuItem value="Yearly">Yearly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                {/* Add other period options here if needed */}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Start Date"
                name="start"
                type="date"
                value={expenseData.start}
                onChange={handleChange}
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
                value={expenseData.end}
                onChange={handleChange}
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
                value={expenseData.institution}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={expenseData.date}
                onChange={handleChange}
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
                value={expenseData.amount}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Note"
                name="note"
                value={expenseData.note}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onClick={handleAddExpense}>
              Add Expense
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddExpense;
