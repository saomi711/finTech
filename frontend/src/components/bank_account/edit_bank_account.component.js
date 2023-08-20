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
import { useBankAccountContext } from '../../contexts/bank_account.context';
import BankAccountService from '../../services/bank_account.service';
import { useBankAccountData } from '../../hooks/useBankAccountData';

const EditBankAccount = () => {
  const { bankAccountId } = useParams();
  const navigate = useNavigate();
  const [ bankAccountData, setBankAccountData ] = useState(null);
  const [rerender, setRerender] = useState(false);
  
  useEffect(() => {
    const fetchBankAccountData = async () => {
      try {
        const response = await BankAccountService.getBankAccountById(bankAccountId);
        console.log(response.data);
        const bankAccount = response.data;
        setBankAccountData(bankAccount);
      } catch (error) {
        console.error('Error fetching bankAccount data:', error);
      }
    };
    fetchBankAccountData();
  }, [bankAccountId, rerender]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    try {
      await BankAccountService.editBankAccount(bankAccountId, { [name]: value });
      //const response = await IncomeService.getIncomeById(incomeId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error saving BankAccount data:', error);
    }
  };

  
  const handleSaveBankAccount = async () => {
    try {
      //await IncomeService.deleteIncomeTransaction(incomeData.id, transactionId);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error deleting BankAccount:', error);
    }
    navigate("/bankAccount");
  };

  if (!bankAccountData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSaveBankAccount} style={{ width: '80%' }}>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2>Edit Bank Account</h2>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Title"
                name="title"
                value={bankAccountData.title}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Bank Name"
                name="bank_name"
                value={bankAccountData.bank_name}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Account Number"
                name="account_number"
                type="number"
                value={bankAccountData.account_number}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Balance"
                name="amount"
                type="number"
                value={bankAccountData.aamount}
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
                value={bankAccountData.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onClick={handleChange}>
              Edit Bank Account
            </Button>
          </Grid>
        </Grid>
          
      </form>
    </div>

    </>
  );
};

export default EditBankAccount;
