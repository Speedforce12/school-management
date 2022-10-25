import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogTitle,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useValue } from "../context/AuthContext";
import UpdateIcon from "@mui/icons-material/Update";
import { useRef } from "react";
import { updateProfile } from "../action/user";

const Profile = () => {
  const {
    state: { profile, currentUser },
    dispatch,
  } = useValue();

  const nameRef = useRef();

  const handleClose = () => {
    dispatch({ type: "UPDATE_PROFILE", payload: { ...profile, open: false } });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { ...profile, file, photoURL },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    updateProfile(currentUser, { name, file: profile.file }, dispatch);
  };

  return (
    <Dialog open={profile.open} onClose={handleClose}>
      <DialogTitle>
        Profile
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
          <DialogContentText>
            Update Your Profile Using These Fields:
          </DialogContentText>
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
            defaultValue={currentUser.name}
          />

          <label htmlFor='profilePhoto'>
            <input
              type='file'
              accept='image/*'
              id='profilePhoto'
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
              src={profile.photoURL}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{ px: "25px" }}>
          <Button type='submit' variant='contained' endIcon={<UpdateIcon />}>
            Update Profile
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Profile;
