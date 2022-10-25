import { Button } from "@mui/material";
import React from "react";

const FormButton = ({ children, color }) => {
  return (
    <Button
      type='submit'
      sx={{
        appearance: "none",
        borderRadius: "8px",
        boxShadow:
          "rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0",
        color: "green",
        cursor: "pointer",
        display: "inline-block",
        padding: "2 10px 0 11px",
        lineHeight: "29px",
        fontSize: "13px",
        textAlign: "center",
        position: "relative",
        fontWeight: "500",
        letterSpacing: "0.25px",
        touchAction: "manipulation",
        transition:
          " box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms",
        willChange: "transform, opacity",
      }}
      variant='outlined'
      color={color}
    >
      {children}
    </Button>
  );
};

export default FormButton;
