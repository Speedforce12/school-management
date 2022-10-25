import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/expense";

export const createExpense = async (expense, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url, body: expense, token: currentUser?.token },
    dispatch
  );

  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        message: "The expense has been added successfully",
        severity: "success",
      },
    });
    dispatch({ type: "CLOSE_MODAL" });

    dispatch({ type: "UPDATE_EXPENSE", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};

export const getExpenses = async (dispatch, currentUser) => {
  const result = await fetchData(
    { url, method: "GET", token: currentUser.token },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_EXPENSES", payload: result });
  }
};

export const deleteExpense = async (expense, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${expense._id}`,
      method: "DELETE",
      token: currentUser?.token,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "The expense has been deleted successfully",
      },
    });

    dispatch({ type: "DELETE_EXPENSE", payload: result._id });
  }

  dispatch({ type: "END_LOADING" });
};

export const updateExpense = async (expense, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${expense._id}`,
      method: "PATCH",
      body: expense,
      token: currentUser?.token,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "The expense has been updated successfully",
      },
    });

    dispatch({ type: "UPDATE_EXPENSE", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};
