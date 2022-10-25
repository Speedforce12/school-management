import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { createTeacher } from "../../action/teacher";
import { TeacherInputs } from "../../components/utility/FormInputs";
import { useValue } from "../../context/AuthContext"


const initialValues = {
  firstName: "",
  lastName: "",
  address: "",
  email:"",
  contact:"",
  qualification: "",
  gender: "Male",
  birth:"",

};

const TeacherForm = () => {
    const {
      state: { currentUser },
      dispatch,
  } = useValue();

  
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => { 
    const {name, value} = e.target
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,

      }
    })  
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    const teacher = {
      ...values
    }

    createTeacher(teacher,currentUser, dispatch)

  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems='flex-start' spacing={2}>
        {TeacherInputs.map((teacher) => (
          <Grid item xs={6} key={teacher.label}>
            <TextField
              fullWidth
              label={teacher.label}
              variant='outlined'
              type={teacher.type}
              name={teacher.name}
              value={values.target}
              onChange={handleChange}
            />
          </Grid>
        ))}

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
  );
};

export default TeacherForm;
