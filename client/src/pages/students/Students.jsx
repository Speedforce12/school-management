import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { Delete, Preview } from "@mui/icons-material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import AddButton from "../../components/utility/AddButton";
import CustomModal from "../../components/utility/CustomModal";
import StudentForm from "./StudentForm";
import { useValue } from "../../context/AuthContext";
import { deleteStudent, getStudents } from "../../action/student";
import StudentEdit from "./StudentEdit";
import { Navigate, useNavigate } from "react-router-dom";


const Students = ({ setSelectedLink, link }) => {
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const {
    state: { students, currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    if (students.length === 0 || students.length > 0)
      getStudents(dispatch, currentUser);
  }, [students]);

  const columns = useMemo(
    () => [
      {
        field: "images",
        headerName: "Photo",
        minWidth: 80,
        renderCell: (params) => (
          <Avatar>{params.row.firstName.charAt(0)}</Avatar>
        ),
        sortable: false,
        filterable: false,
      },

      {
        field: "firstName",
        headerName: "First name",
        minWidth: 150,
        editable: true,
        flex: 0.6,
      },
      {
        field: "lastName",
        headerName: "Last name",
        minWidth: 150,
        editable: true,
        flex: 0.6,
      },
      { field: "address", headerName: "Address", minWidth: 170 },
      { field: "gender", headerName: "Gender", minWidth: 170 },
      { field: "parents", headerName: "Parent", minWidth: 150 },
      { field: "contact", headerName: "Contact", minWidth: 150 },

      { field: "_id", hide: true },

      {
        field: "actions",
        headerName: "Actions",
        minWidth: 100,
        flex: 1,
        sortable: false,
        editable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const handleEdit = (e) => {
            const currentRow = params.row;
            navigate("/student-details");
            dispatch({ type: "ADD_INFO", payload: currentRow });

            return currentRow;
          };
          return (
            <Stack direction='row'>
              <Tooltip title='View student details'>
                <IconButton
                  onClick={handleEdit}
                >
                  <Preview color='info' />
                </IconButton>
              </Tooltip>
              <StudentEdit data={params.row} />
              <Tooltip title='Delete this student'>
                <IconButton
                  onClick={() =>
                    deleteStudent(params.row, currentUser, dispatch)
                  }
                >
                  <Delete color='error' />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Paper elevation={3} sx={{ padding: 5, margin: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Typography variant='h4' component='h1'>
            Manage Students
          </Typography>

          <AddButton>Add Student</AddButton>
        </Box>
        <Box sx={{ height: 412, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={students}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? grey[200] : grey[900],
              },
            }}
          />
        </Box>
      </Paper>
      <CustomModal
        title='Add Students'
        subtitle='Fill out the fields below to add new Student'
      >
        <StudentForm />
      </CustomModal>
    </>
  );
};

export default Students;
