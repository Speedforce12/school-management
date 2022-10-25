import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { StudentInputs } from "../../components/utility/FormInputs";
import {createStudent} from "../../action/student"
import { useValue } from "../../context/AuthContext";

const initialValues = {
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

const StudentForm = () => {
  const { state: { currentUser }, dispatch } = useValue()
  

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)
    const student = {
   ...values
    }

    createStudent(student, currentUser, dispatch)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems='flex-start' spacing={2}>
        {StudentInputs.map((student) => (
          <Grid item xs={6} key={student.label}>
            <TextField
              fullWidth
              label={student.label}
              variant='outlined'
              type={student.type}
              name={student.name}
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

export default StudentForm;
