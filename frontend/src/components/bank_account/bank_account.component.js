import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Link, Grid, ButtonGroup } from '@material-ui/core';
import BankAccountService from '../../services/bank_account.service';
import { useBankAccountContext } from '../../contexts/bank_account.context';
import { useBankAccountData } from '../../hooks/useBankAccountData';

const BankAccount = () => {
    const { bankAccountData, setBankAccountData } = useBankAccountContext();
    const [rerender, setRerender] = useState(false);
    useBankAccountData();
    const navigate = useNavigate();
    
    useEffect(() => {
    }, []);

    const handleEdit = (bankAccountId) => {
        navigate(`/editBankAccount/${bankAccountId}`);
        console.log(`Editing BankAccount with ID: ${bankAccountId}`);
    };
    const handleAddBankAccount = () => {
        navigate(`/addBankAccount`);
    };

    const handleDelete = async (bankAccountId) => {
      try {
        const response = await BankAccountService.deleteGoal(bankAccountId);
        console.log('Response:', response); // Log response to check its content

        if (response && response.status === 200) {
            console.log(`BankAccount with ID ${bankAccountId} has been deleted.`);
            setBankAccountData((prevBankAccountData) =>
                prevBankAccountData.filter((bankAccount) => bankAccount.id !== bankAccountId)
            );
        }
    } catch (error) {
        console.error('Error deleting BankAccount data:', error);
    }
    };

  if (!bankAccountData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <Grid container justify="center">
        <Button component={Link} to="/addBankAccount" color="secondary" onClick={() => handleAddBankAccount()}>
          Add Bank Account
        </Button>
      </Grid>
      <Grid container justify="center">
      <h2>Bank Account List</h2>
      </Grid>
      <List>
        {bankAccountData.map((bankAccount) => {

          return (
            
            <ListItem key={bankAccount.id}>
              <Grid container justify="center" direction="column" alignItems="center">
              <ListItemText
                primary={`Title: ${bankAccount.title}`}
                secondary={
                  <>
                    <strong>Bank Name:</strong> {bankAccount.bank_name} <br />
                    <strong>Account Number:</strong> {bankAccount.account_number} <br />
                    <strong>Balance:</strong> {bankAccount.amount} <br />
                    <strong>Date:</strong> {bankAccount.date} <br />
                  </>
                }
              />
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => handleEdit(bankAccount.id)}>
                Edit
              </Button>
              <Button onClick={() => handleDelete(bankAccount.id)}>
                Delete
              </Button>
              </ButtonGroup>
              </Grid>
            </ListItem>
            
          );
        })}
      </List>

    </div>
  );
};

export default BankAccount;
