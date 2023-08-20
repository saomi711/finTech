import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import BankAccountService from '../../services/bank_account.service';
import { useNavigate } from 'react-router-dom';

const AddBankAccount = () => {
  const navigate = useNavigate();
  const [ bankAccountData, setBankAccountData] = useState({
    title: '',
    bank_name: '',
    account_number: '',
    date: '',
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankAccountData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddBankAccount = async (e) => {
    e.preventDefault();
    try {
      
      const bankAccountResponse = await BankAccountService.addBankAccount({
        title: bankAccountData.title,
        bank_name: bankAccountData.bank_name,
        account_number: bankAccountData.account_number,
        date: bankAccountData.date,
        amount: bankAccountData.amount,

      });
      const bankAccountId = bankAccountResponse;
      
      setBankAccountData({
        title: '',
        bank_name: '',
        account_number: '',
        date: '',
        amount: '',
      });

    } catch (error) {
      console.error('Error adding bankAccount:', error);
    }
    navigate("/bankAccount");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleAddBankAccount} style={{ width: '80%' }}>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2>Add Bank Account</h2>
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
            <Button type="submit" variant="contained" color="primary" onClick={handleAddBankAccount}>
              Add Bank Account
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddBankAccount;
