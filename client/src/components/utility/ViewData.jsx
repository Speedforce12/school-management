import { Button } from "@mui/material";
import React from "react";
import { useValue } from "../../context/AuthContext";

const ViewData = ({ children }) => {
  const { dispatch }  = useValue()
  return (
    <Button
      variant='outlined'
      sx={{
        boxShadow: "rgba(0, 0, 0, .2) 15px 28px 25px -18px",
        cursor: "pointer",
        alignSelf: "center",
        borderStyle: "solid",
        borderWidth: "2px",
        boxSizing: "border-box",
        transition: "all 235ms ease-in-out",
        padding: "5px 5px",
        borderRadius: "16px",
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, .3) 2px 8px 8px -5px",
          transform: " translate3d(20px, -10px)",
        },
      }}
      onClick={()=>dispatch({type:"OPEN_MODAL"})}
    >
      {children}
    </Button>
  );
};

export default ViewData;
