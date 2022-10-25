import React, { useMemo, useState } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { useValue } from "../../../context/AuthContext";
import { useEffect } from "react";
import { deleteIncome, getIncomes } from "../../../action/income";
import { Delete, Edit } from "@mui/icons-material";

const IncomeTable = () => {
  const {
    state: { incomes, currentUser },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (incomes.length > 0 || incomes.length === 0)
      getIncomes(dispatch, currentUser);
  }, [incomes, dispatch, currentUser]);

  const columns = useMemo(
    () => [
      {
        field: "income",
        headerName: "Income",
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
        field: "income_date",
        headerName: "Date Received",
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
              <Tooltip title='Edit this income'>
                <IconButton onClick={handleDetails}>
                  <Edit color='success' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete this income'>
                <IconButton
                  onClick={() =>
                    deleteIncome(params.row, currentUser, dispatch)
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
        rows={incomes}
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

export default IncomeTable;
