import { Box, Paper, Typography } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import React, { useEffect } from "react";
import FinanceChart from "./FinanceChart";
import { useValue } from "../../context/AuthContext";
import Protected from "../../components/protected/Protected";
import { getStudents } from "../../action/student";
import { getTeachers } from "../../action/teacher";
const Main = ({ setSelectedLink, link }) => {
  const {
    state: { teachers, students, currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    if (students.length === 0 || students.length > 0) getStudents(dispatch, currentUser);
    if (teachers.length === 0 || teachers.length > 0) getTeachers(dispatch, currentUser);
  }, []);

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "repeat(2,1fr)",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Protected>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant='h4'>Total Students</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SchoolOutlinedIcon
              sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
            />
            <Typography variant='h4'>{students.length}</Typography>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant='h4'>Total Teacher</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SupervisedUserCircleOutlinedIcon
              sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
            />
            <Typography variant='h4'>{teachers.length}</Typography>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
          <FinanceChart />
        </Paper>
      </Protected>
    </Box>
  );
};

export default Main;
