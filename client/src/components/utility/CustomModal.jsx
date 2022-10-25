import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useValue } from "../../context/AuthContext";
import { red } from "@mui/material/colors";

const CustomModal = ({ title, subtitle, children }) => {
  const {
    state: { openModal },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={openModal}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle>
          {title}
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
          <DialogContentText sx={{ textAlign: "center", py: 2 }}>
            {subtitle}
          </DialogContentText>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomModal;
