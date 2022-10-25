import { Button } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useValue } from "../../context/AuthContext";

const AddButton = ({ children }) => {
  const {dispatch}  = useValue()
  return (
    <Button
      onClick={() => dispatch({ type: "OPEN_MODAL" })}
      variant='outlined'
      sx={{
        boxShadow: "rgba(0, 0, 0, .2) 15px 28px 25px -18px",
        cursor: "pointer",
        transition: "all 235ms ease-in-out",
        touchAction: "manipulation",
        alignSelf: "center",
        backgroundPosition: "0 90%",
        backgroundSize: "4px 3px",
        borderStyle: "solid",
        borderWidth: "2px",
        boxSizing: "border-box",
        padding: ".75rem",
        borderRadius: "15px 225px 255px 15px 15px 255px 225px 15px",
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, .3) 2px 8px 8px -5px",
          transform: " translate3d(0, 2px, 0)",
        },
      }}
      startIcon={<PersonAddOutlinedIcon />}
    >
      {children}
    </Button>
  );
};

export default AddButton;
