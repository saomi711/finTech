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
import { useIncomeContext } from '../../contexts/income.context';
import IncomeService from '../../services/income.service';
import { useIncomeData } from '../../hooks/useIncomeData';

const EditIncome = () => {
  const { incomeId } = useParams();
  const navigate = useNavigate();
  const [ incomeData, setIncomeData ] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [transactionData, setTransactionData] = useState({
    date: '',
    amount: '',
    note: '',
  });

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await IncomeService.getIncomeById(incomeId);
        console.log(response.data);
        const income = response.data;
        const transactionResponse = await IncomeService.getIncomeTransactions(incomeId);
        const transactions = transactionResponse.data;
        const updatedResponse =  { ...income, transactions };
        setIncomeData(updatedResponse);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };
    fetchIncomeData();
  }, [incomeId, rerender]);

  const handleChangeIncome = async (e) => {
    const { name, value } = e.target;
    try {
      await IncomeService.editIncome(incomeId, { [name]: value });
      //const response = await IncomeService.getIncomeById(incomeId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error saving income data:', error);
    }
  };

  const handleChangeTransaction = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddTransaction = async () => {
    try {
      await IncomeService.addIncomeTransaction(incomeId, transactionData);
      //setIncomeData(response.data);
      setTransactionData({
        date: '',
        amount: '',
        note: '',
      });
      setRerender(!rerender);
    } catch (error) {
      console.error('Error adding income transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await IncomeService.deleteIncomeTransaction(incomeId, transactionId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error deleting income transaction:', error);
    }
  };

  const handleSaveIncome = async () => {
    try {
      //await IncomeService.deleteIncomeTransaction(incomeData.id, transactionId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error deleting income transaction:', error);
    }
  };

  if (!incomeData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSaveIncome} style={{ width: '80%' }}>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2>Edit Income</h2>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
              label="Title"
              name="title"
              value={incomeData.title}
              onChange={handleChangeIncome}
              />
            </FormControl>
          </Grid>
        
      

      {/* Other income fields */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Category"
                name="category"
                value={incomeData?.category || ''}
                onChange={handleChangeIncome}
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
                value={incomeData?.period || ''}
                onChange={handleChangeIncome}
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
                value={incomeData?.start || ''}
                onChange={handleChangeIncome}
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
                value={incomeData?.end || ''}
                onChange={handleChangeIncome}
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
                value={incomeData?.institution || ''}
                onChange={handleChangeIncome}
              />
            </FormControl>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveIncome}
          >
            Save Income
          </Button>
        </Grid>
      </form>
    </div>

    {incomeData.category === 'Periodic' && (
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
        <h2>Income Transactions</h2>
      </Grid>

      <List>
        {incomeData?.transactions?.map((transaction) => (
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

export default EditIncome;
