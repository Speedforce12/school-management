import {
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  InputBase,
  Button,
  CssBaseline,
} from "@mui/material";
import {
  alpha,
  createTheme,
  styled,
  ThemeProvider,
} from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SearchIcon from "@mui/icons-material/Search";
import { useValue } from "../context/AuthContext";
import UserIcons from "./UserIcons ";
import LoginIcon from "@mui/icons-material/Login";
import { useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import MuiAppBar from "@mui/material/AppBar";
import Protected from "./protected/Protected"
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "50%",
  },

  [theme.breakpoints.down("md")]: {
    marginRight: theme.spacing(3),
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const drawerWidth = 240;

const Navbar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? "dark" : "light",
        },
      }),
    [dark]
  );

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position='fixed' open={open}>
            <Container maxWidth='lg'>
              <Toolbar disableGutters>
                <Box sx={{ mr: 1 }}>
                  <IconButton
                    aria-label='open drawer'
                    onClick={handleDrawerOpen}
                    edge='start'
                    sx={{
                      marginRight: 5,
                      ...(open && { display: "none" }),
                    }}
                  >
                    <MenuRoundedIcon color='inherit' fontSize='large' />
                  </IconButton>
                </Box>
                <Typography
                  variant='h6'
                  component='h1'
                  noWrap
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  School Management
                </Typography>
                <Typography
                  sx={{
                    display: { xs: "block", md: "none" },
                    paddingRight: { xs: 2, md: 0 },
                  }}
                >
                  <AutoStoriesIcon />
                </Typography>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder='Search…'
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                {!currentUser ? (
                  <Button
                    color='inherit'
                    startIcon={<LoginIcon />}
                    onClick={() => dispatch({ type: "OPEN_LOGIN" })}
                  >
                    Login
                  </Button>
                ) : (
                  //   add user icons component
                  <UserIcons {...{ dark, setDark }} />
                )}
              </Toolbar>
            </Container>
          </AppBar>
          <Toolbar />
          <Protected>
            <Sidebar {...{ open, setOpen }} />
          </Protected>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Navbar;
