import { Avatar, Box, IconButton,Tooltip} from "@mui/material";
import { useState } from "react";
import { useValue } from "../context/AuthContext";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import UserMenu from "./UserMenu";
import Brightness7OutlinedIcon from "@mui/icons-material/Brightness7Outlined";

const UserIcons = ({dark, setDark}) => {
  const {
    state: { currentUser },
  } = useValue();

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);

  return (
    
      <Box
        sx={{
          paddingLeft: { xs: 2, md: 0 },
          display: { xs: "none", md: "block" },
        }}
      >
        <IconButton size='large' color='inherit' onClick={() => setDark(!dark)}>
          {dark ? <Brightness7OutlinedIcon/> : <Brightness4OutlinedIcon />}
        </IconButton>

        <Tooltip title='Account Settings'>
          <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
            <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
              {currentUser?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
        <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
      </Box>
  );
};

export default UserIcons;
