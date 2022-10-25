import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CustomModal from "../../../components/utility/CustomModal";
import FormButton from "../../../components/utility/FormButton";
import React, { useState } from "react";
import { useValue } from "../../../context/AuthContext";
import { createExpense } from "../../../action/expense";
import ExpenseEdit from "./ExpenseEdit";
import ExpenseTable from "./ExpenseTable";
import ExpenseChart from "./ExpenseChart";
import ViewData from "../../../components/utility/ViewData";

const Expense = () => {
  const {
    state: { currentUser, editMode },
    dispatch,
  } = useValue();

  const [values, setValues] = useState({
    expense: "",
    amount: 0,
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = {
      ...values,
    };
    setValues({
      expense: "",
      amount: 0,
      date: "",
    });
    createExpense(expense, currentUser, dispatch);
  };
  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={4}
      >
        <Grid item xs={12} md={6}>
          {editMode ? (
            <ExpenseEdit />
          ) : (
            <Paper
              elevation={3}
              sx={{
                mt: 5,
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                display: "flex",
                width: "400px",
                py: 5,
                borderRadius: "20px",
              }}
            >
              <Typography
                variant='h5'
                component='span'
                sx={{ alignItems: "center", color: "green" }}
              >
                Add Expense
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    mt: 5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    width: "300px",
                  }}
                >
                  <TextField
                    label='Expense'
                    type='text'
                    name='expense'
                    variant='standard'
                    onChange={handleChange}
                    color='success'
                    value={values.expense}
                  />
                  <TextField
                    label='Amount'
                    type='double'
                    name='amount'
                    variant='standard'
                    color='success'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>$</InputAdornment>
                      ),
                    }}
                    onChange={handleChange}
                    value={values.amount}
                  />
                  <TextField
                    type='date'
                    name='date'
                    label='Date'
                    variant='standard'
                    color='success'
                    value={values.date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                  />
                  <Box display='flex' justifyContent='center'>
                    <FormButton color={"success"}>Add Expense</FormButton>
                  </Box>
                </Box>
              </form>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={6} paddingRight='20px'>
          <Paper
            elevation={3}
            sx={{
              mt: 5,
              padding: "20px",
              width: "650px",
              py: 5,
              borderRadius: "20px",
            }}
          >
            <Box display='flex' justifyContent='space-between' mb='20px'>
              <Typography variant='h4' component='h1'>
                Manage Expenses
              </Typography>
              <ViewData>VISUALIZE DATA</ViewData>
            </Box>
            <ExpenseTable />
          </Paper>
        </Grid>
      </Grid>
      <CustomModal title='Line Chart Showing Expenses'>
        <ExpenseChart />
      </CustomModal>
    </>
  );
};

export default Expense;
