import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/income";

export const createIncome = async (income, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url, body: income, token: currentUser?.token },
    dispatch
  );

  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        message: "The income has been added successfully",
        severity: "success",
      },
    });
    dispatch({ type: "CLOSE_MODAL" });

    dispatch({ type: "UPDATE_INCOME", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};

export const getIncomes = async (dispatch, currentUser) => {
  const result = await fetchData(
    { url, method: "GET", token: currentUser.token },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_INCOMES", payload: result });
  }
};

export const deleteIncome = async (income, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${income._id}`,
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
        message: "The income has been deleted successfully",
      },
    });

    dispatch({ type: "DELETE_INCOME", payload: result._id });
  }

  dispatch({ type: "END_LOADING" });
};

export const updateIncome = async (income, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${income._id}`,
      method: "PATCH",
      body: income,
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
        message: "The income has been updated successfully",
      },
    });

    dispatch({ type: "UPDATE_INCOME", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};
