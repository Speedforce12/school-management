import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const PasswordField = ({
  passwordRef,
  id = "password",
  label = "Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <TextField
      margin='normal'
      variant='standard'
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      fullWidth
      required
      inputRef={passwordRef}
      inputProps={{ minLength: 6 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={handleMouseDown}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
