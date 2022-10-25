import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { updateIncome } from "../../../action/income";
import FormButton from "../../../components/utility/FormButton";
import { useValue } from "../../../context/AuthContext";

const IncomeEdit = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [values, setValues] = useState({
    income: "",
    amount: 0,
    income_date: "",
  });

  useEffect(() => {
    setValues(JSON.parse(sessionStorage.getItem("info")));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const UpdatedIncome = {
      ...values,
    };
    updateIncome(UpdatedIncome, currentUser, dispatch);

    dispatch({ type: "END_EDITING" });
  };

  const cancelUpdate = (e) => {
    sessionStorage.removeItem("info");
    dispatch({ type: "END_EDITING" });
  };

  return (
    <>
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
          Update Income
        </Typography>
        <form onSubmit={handleEdit}>
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
            <Box display='flex' justifyContent='space-between'>
              <FormButton color={"success"}>Update Income</FormButton>

              <Button color='error' variant='outlined' onClick={cancelUpdate}>
                Cancel Update
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default IncomeEdit;
