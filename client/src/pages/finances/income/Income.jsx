import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { createIncome } from "../../../action/income";
import CustomModal from "../../../components/utility/CustomModal";
import FormButton from "../../../components/utility/FormButton";
import ViewData from "../../../components/utility/ViewData";
import { useValue } from "../../../context/AuthContext";
import IncomeChart from "./IncomeChart";
import IncomeEdit from "./IncomeEdit";
import IncomeTable from "./IncomeTable";

const Income = () => {
  const {
    state: { currentUser, editMode },
    dispatch,
  } = useValue();

  const [values, setValues] = useState({
    income: "",
    amount: 0,
    income_date: "",
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

    const income = {
      ...values,
    };
    setValues({
      income: "",
      amount: 0,
      income_date: "",
    });
    createIncome(income, currentUser, dispatch);
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
            <IncomeEdit />
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
                Add Income
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
                    label='Income'
                    type='text'
                    name='income'
                    variant='standard'
                    onChange={handleChange}
                    color='success'
                    value={values.income}
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
                    name='income_date'
                    label='Date'
                    variant='standard'
                    color='success'
                    value={values.income_date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                  />
                  <Box display='flex' justifyContent='center'>
                    <FormButton color={"success"}>Add Income</FormButton>
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
                Manage Incomes
              </Typography>
              <ViewData>VISUALIZE DATA</ViewData>
            </Box>
            <IncomeTable />
          </Paper>
        </Grid>
      </Grid>
      <CustomModal title='Line Chart Showing Income Earned'>
        <IncomeChart />
      </CustomModal>
    </>
  );
};

export default Income;
