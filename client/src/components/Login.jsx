import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PasswordField from "./PasswordField";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import { login, register } from "../action/user";
import {useValue} from "../context/AuthContext"

const Login = () => {
     const {
       state: { openLogin },
       dispatch,
     } = useValue();
     const [title, setTitle] = useState("Login");
     const [isRegister, setIsRegister] = useState(false);

     const nameRef = useRef();
     const emailRef = useRef();
     const passwordRef = useRef();
     const confirmPasswordRef = useRef();

     const handleSubmit = (e) => {
       e.preventDefault();

       const email = emailRef.current.value;
       const password = passwordRef.current.value;

       //send login request if it is not register and return
       if (!isRegister) return login({ email, password }, dispatch);
       const name = nameRef.current.value;
       const confirmPassword = confirmPasswordRef.current.value;
       if (password !== confirmPassword)
         return dispatch({
           type: "UPDATE_ALERT",
           payload: {
             open: true,
             severity: "error",
             message: "Passwords do not match",
           },
         });

       // send register request
       register({ name, email, password }, dispatch);
     };

     const handleClose = () => {
       dispatch({ type: "CLOSE_LOGIN" });
     };

     useEffect(() => {
       isRegister ? setTitle("Register") : setTitle("Login");
     }, [isRegister]);

  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>Please Fill in the Fields</DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin='normal'
              variant='standard'
              id='name'
              label='Name'
              type='text'
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin='normal'
            variant='standard'
            id='email'
            label='Email'
            type='email'
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id='confirmPassword'
              label='Confirm Password'
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: "25px" }}>
          <Button
            type='submit'
            variant='contained'
            endIcon={<PublishOutlinedIcon />}
          >
            {isRegister ? "Register" : "Login"}
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: "left", p: "5px 24px" }}>
        <Typography variant='body1'>
          {isRegister ? "Already Register? " : "Need to Register? "}
        </Typography>

        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Log-In" : "Sign-Up"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
