import React, { useMemo, useState } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { useValue } from "../../../context/AuthContext";
import { useEffect } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { deleteExpense, getExpenses } from "../../../action/expense";

const ExpenseTable = () => {
  const {
    state: { expenses, currentUser },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (expenses.length > 0 || expenses.length === 0)
      getExpenses(dispatch, currentUser);
  }, [expenses]);

  const columns = useMemo(
    () => [
      {
        field: "expense",
        headerName: "Expense",
        minWidth: 150,
        editable: true,
        flex: 1,
      },
      {
        field: "amount",
        headerName: "Amount",
        minWidth: 150,
        editable: true,
        flex: 1,
      },
      {
        field: "date",
        headerName: "Date",
        minWidth: 170,
        flex: 1,
        sortable: false,
      },

      { field: "_id", hide: true },

      {
        field: "actions",
        headerName: "Actions",
        minWidth: 100,
        flex: 1,
        filterable: false,
        sortable: false,
        editable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const handleDetails = (e) => {
            // navigate("/details");
            const currentRow = params.row;
            dispatch({ type: "ADD_INFO", payload: currentRow });
            dispatch({ type: "START_EDITING" });
          };
          return (
            <Stack direction='row'>
              <Tooltip title='Edit this expense'>
                <IconButton onClick={handleDetails}>
                  <Edit color='success' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete this expense'>
                <IconButton
                  onClick={() =>
                    deleteExpense(params.row, currentUser, dispatch)
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
    <Box sx={{ height: 412, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={expenses}
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
  );
};

export default ExpenseTable;
