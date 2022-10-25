
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useValue } from "../context/AuthContext";
import Profile from "../components/Profile"
import { logout} from "../action/user";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const {
    dispatch,
    state: {
      currentUser,
    },
    } = useValue();
    
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const handleLogout = () => {
      logout(dispatch)
    }

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {!currentUser.google && (
          <MenuItem
            onClick={() =>
              dispatch({
                type: "UPDATE_PROFILE",
                payload: {
                  open: true,
                  file: null,
                  photoURL: currentUser?.photoURL,
                },
              })
            }
          >
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize='small' />
            </ListItemIcon>
            Profile
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;
