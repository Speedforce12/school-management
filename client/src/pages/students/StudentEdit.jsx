import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useValue } from "../../context/AuthContext";
import { updateStudent } from "../../action/student";
import { Edit } from "@mui/icons-material";

const initialValues = {
  id: "",
  firstName: "",
  lastName: "",
  address: "",
  parents: "",
  contact: "",
  gender: "Male",
  birth: "",
  medicals: "",
  parent_job: "",
};

const StudentEdit = ({ data }) => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [open, setOpen] = useState(false);

  const [values, setValues] = useState(initialValues);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateData = (
    id,
    firstName,
    lastName,
    address,
    contact,
    parents,
    gender,
    birth,
    medicals,
    parent_job
  ) => {
    setValues((prev) => {
      return {
        ...prev,
        id: id,
        firstName: firstName,
        lastName: lastName,
        address: address,
        contact: contact,
        parents: parents,
        gender: gender,
        birth: birth,
        medicals: medicals,
        parent_job: parent_job,
      };
    });
    handleOpen();
  };

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
    console.log(values);
    const student = {
      ...values,
    };

    updateStudent(student, currentUser, dispatch);
    handleClose();
  };

  return (
    <>
      <Tooltip title='Edit this student'>
        <IconButton
          onClick={() =>
            updateData(
              data._id,
              data.firstName,
              data.lastName,
              data.address,
              data.contact,
              data.parents,
              data.gender,
              data.birth,
              data.medicals,
              data.parent_job
            )
          }
        >
          <Edit color='success' />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Edit Student
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: red[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            sx={{ textAlign: "center", py: 2 }}
          >
            Fill out the fields below to edit the Student
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <Grid container alignItems='flex-start' spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='First Name'
                  variant='outlined'
                  type='text'
                  name='firstName'
                  value={values.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Last Name'
                  variant='outlined'
                  type='text'
                  name='lastName'
                  value={values.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Address'
                  variant='outlined'
                  type='text'
                  name='address'
                  value={values.address}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Contact'
                  variant='outlined'
                  type='text'
                  name='contact'
                  value={values.contact}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Parents'
                  variant='outlined'
                  type='text'
                  name='parents'
                  value={values.parents}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Gender'
                  variant='outlined'
                  type='text'
                  name='gender'
                  value={values.gender}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='D.O.B'
                  variant='outlined'
                  type='text'
                  name='birth'
                  value={values.birth}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='medicals Conditions'
                  variant='outlined'
                  type='text'
                  name='medicals'
                  value={values.medicals}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Parents Job'
                  variant='outlined'
                  type='text'
                  name='parent_job'
                  value={values.parent_job}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                container
                justifyContent='center'
                alignItems='center'
                marginTop='20px'
              >
                <Grid item>
                  <Button type='submit' variant='contained'>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        {/* <DialogActions>
          <Button
            onClick={handleClose}
            variant='outlined'
            color='primary'
            autoFocus
          >
            やめる
          </Button>
          <Button onClick={(e) => deleteRow(rowId, e)} color='primary'>
            削除する
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default StudentEdit;
