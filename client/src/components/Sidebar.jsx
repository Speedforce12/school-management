import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
} from "@mui/material";
import {
  ChevronLeft,
  DashboardOutlined,
  Logout,
  PeopleAltOutlined,
} from "@mui/icons-material";
import { logout } from "../action/user";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import MuiDrawer from "@mui/material/Drawer";
import DetailsIcon from "@mui/icons-material/Details";
import { useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useValue } from "../context/AuthContext";
import Finances from "../pages/finances/Finances";
import Users from "../pages/users/Users";
import Teachers from "../pages/teachers/Teachers";
import Students from "../pages/students/Students";
import Main from "../pages/main/Main";
import TeacherDetail from "../pages/teachers/TeacherDetail";
import StudentDetail from "../pages/students/StudentDetail";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ open, setOpen }) => {
  const [selectedLink, setSelectedLink] = useState("");
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const list = useMemo(
    () => [
      {
        title: "Main",
        icon: <DashboardOutlined />,
        link: "",
        component: <Main {...{ setSelectedLink, link: "" }} />,
      },
      {
        title: "Users",
        icon: <PeopleAltOutlined />,
        link: "users",
        component: <Users {...{ setSelectedLink, link: "users" }} />,
      },

      {
        title: "Students",
        icon: <SchoolOutlinedIcon />,
        link: "students",
        component: <Students {...{ setSelectedLink, link: "students" }} />,
      },
      {
        title: "Teachers",
        icon: <SupervisedUserCircleOutlinedIcon />,
        link: "teachers",
        component: <Teachers {...{ setSelectedLink, link: "teachers" }} />,
      },
      {
        title: "Finance",
        icon: <RequestQuoteOutlinedIcon />,
        link: "finances",
        component: <Finances {...{ setSelectedLink, link: "finances" }} />,
      },

      {
        title: "Teacher Details",
        icon: <DetailsIcon />,
        link: "details",
        component: <TeacherDetail />,
      },
      {
        title: "  ",
        link: "student-details",
        component: <StudentDetail />,
      },
    ],
    []
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem
              key={item.title}
              disablePadding
              sx={{
                display:
                  item.link  === "details" && "studentInfo" ? "none" : "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            textAlign: "center",
            mx: "auto",
            mt: 3,
            mb: 1,
            display: { xs: "block", md: "none" },
          }}
        >
          <Tooltip title={currentUser?.name || ""}>
            <Avatar
              src={currentUser?.photoURL}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
          <Tooltip title='Logout' sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
        {/* <Box sx={{ textAlign: "center" }}>
          {open && <Typography>{currentUser?.name}</Typography>}
          <Typography variant='body2'>{currentUser?.role || "role"}</Typography>
          {open && (
            <Typography variant='body2'>{currentUser?.email}</Typography>
          )}
       
        </Box> */}
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
          {/* <Route
            path='*'
            element={
              isAdmin(currentUser) ? (
                <Main {...{ setSelectedLink, link: "" }} />
              ) : (
                <Rooms {...{ setSelectedLink, link: "rooms" }} />
              )
            }
          /> */}
        </Routes>
      </Box>
    </>
  );
};

export default Sidebar;
