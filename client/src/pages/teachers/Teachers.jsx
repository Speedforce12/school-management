import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import AddButton from "../../components/utility/AddButton";
import CustomModal from "../../components/utility/CustomModal";
import TeacherForm from "./TeacherForm";
import { useValue } from "../../context/AuthContext";
import { deleteTeacher, getTeachers } from "../../action/teacher";
import { Delete, Preview } from "@mui/icons-material";
import TeacherEdit from "./TeacherEdit";
import { useNavigate } from "react-router-dom";

const Teachers = ({ setSelectedLink, link }) => {
  const navigate = useNavigate();
  const {
    state: { currentUser, teachers },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (teachers.length === 0 || teachers.length > 0)
      getTeachers(dispatch, currentUser);
  }, [teachers]);

  const columns = useMemo(
    () => [
      {
        field: "firstName",
        headerName: "First name",
        minWidth: 150,
        editable: true,
        flex: 1,
      },
      {
        field: "lastName",
        headerName: "Last name",
        minWidth: 150,
        editable: true,
        flex: 1,
      },
      {
        field: "address",
        headerName: "Address",
        minWidth: 170,
        flex: 1,
        sortable: false,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 150,
        flex: 1,
        sortable: false,
      },
      {
        field: "contact",
        headerName: "Contact",
        minWidth: 150,
        flex: 1,
        sortable: false,
      },
      {
        field: "qualification",
        headerName: "Qualification",
        minWidth: 200,
        flex: 1,
        sortable: false,
      },

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
          const handleDetails = (e) => {
            navigate("/details");
            const currentRow = params.row;
            dispatch({ type: "ADD_INFO", payload: currentRow});
          };
          return (
            <Stack direction='row'>
              <Tooltip title='View teacher details'>
                <IconButton onClick={handleDetails}>
                  <Preview color='info' />
                </IconButton>
              </Tooltip>
              <TeacherEdit data={params.row} />
              <Tooltip title='Delete this teacher'>
                <IconButton
                  onClick={() =>
                    deleteTeacher(params.row, currentUser, dispatch)
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
    [currentUser, dispatch]
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
            Manage Teachers
          </Typography>
          <AddButton>New Teacher</AddButton>
        </Box>
        <Box sx={{ height: 412, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={teachers}
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
        title='Add Teacher'
        subtitle='Fill out the fields below to add new Teacher'
      >
        <TeacherForm />
      </CustomModal>
    </>
  );
};

export default Teachers;
