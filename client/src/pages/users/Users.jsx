import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import moment from "moment";
import { useValue } from "../../context/AuthContext";
import { getUsers } from "../../action/user";
import AddButton from "../../components/utility/AddButton";
import CustomModal from "../../components/utility/CustomModal";
import Form from "../teachers/TeacherForm";
import { StudentInputs } from "../../components/utility/FormInputs";
import UserActions from "./UserActions";

const Users = ({ setSelectedLink, link }) => {
  const [pageSize, setPageSize] = useState(5);
  // const [rowId, setRowId] = useState(null);
  const {
    state: { users, currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0) getUsers(dispatch, currentUser);
  }, [users.length]);

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.photoURL} />,
        sortable: false,
        filterable: false,
      },

      { field: "name", headerName: "Name", width: 170 },
      { field: "email", headerName: "Email", width: 200 },

      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },

      { field: "_id", headerName: "Id", flex: 0.5, minWidth: 50 },
      {
        field: "actions",
        headerName: "Actions",
        type: "Actions",
        minWidth: 100,
        flex: 1,
        sortable: false,
        editable: false,
        renderCell: (params) => <UserActions {...{ params }} />,
      },
    ],
    []
  );

  return (
    <>
      <Paper elevation={3} sx={{ padding: 5, margin: 5, width: "80%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Typography variant='h4' component='h1'>
            Manage Users
          </Typography>
          <AddButton>New User</AddButton>
        </Box>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={users}
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
            // onCellEditCommit={(params) => setRowId(params.id)}
          />
        </Box>
      </Paper>
      <CustomModal
        title='Add User'
        subtitle='Fill out the fields below to add new user'
      >
        <Form>
          {StudentInputs.map((student) => (
            <Grid item xs={6} key={student.name}>
              <TextField
                fullWidth
                label={student.label}
                variant='outlined'
                type={student.type}
                name={student.name}
              />
            </Grid>
          ))}
        </Form>
      </CustomModal>
    </>
  );
};

export default Users;
