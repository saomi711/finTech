import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import IncomeService from '../../services/income.service';
import { useNavigate } from 'react-router-dom';

const AddIncome = () => {
  const navigate = useNavigate();
  const [incomeData, setIncomeData] = useState({
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
    setIncomeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      
      const incomeResponse = await IncomeService.addIncome({
        title: incomeData.title,
        category: incomeData.category,
        period: incomeData.period,
        start: incomeData.start,
        end: incomeData.end,
        institution: incomeData.institution,
      });
      const incomeId = incomeResponse;
      
      const incomeTransactionData = {
          date: incomeData.date,
          amount: incomeData.amount,
          note: incomeData.note,
      };
    await IncomeService.addIncomeTransaction(incomeId, incomeTransactionData);
      
      setIncomeData({
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
      console.error('Error adding income:', error);
    }
    navigate("/income");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleAddIncome} style={{ width: '80%' }}>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2>Add Income</h2>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Title"
                name="title"
                value={incomeData.title}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Category"
                name="category"
                value={incomeData.category}
                onChange={handleChange}
                select
              >
                <MenuItem value="One Time">One Time</MenuItem>
                <MenuItem value="Periodic">Periodic</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          {incomeData.category === 'Periodic' && (
          <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Period"
                name="period"
                value={incomeData.period}
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
                value={incomeData.start}
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
                value={incomeData.end}
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
                value={incomeData.institution}
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
                value={incomeData.date}
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
                value={incomeData.amount}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Note"
                name="note"
                value={incomeData.note}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onClick={handleAddIncome}>
              Add Income
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddIncome;
