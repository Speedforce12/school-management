import fetchData from "./utils/fetchData";


const url = process.env.REACT_APP_SERVER_URL + "/teacher";

export const createTeacher = async (teacher, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url, body: teacher, token: currentUser?.token },
    dispatch
  );

  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        message: "The teacher has been added successfully",
        severity: "success",
      },
    });
    dispatch({ type: "CLOSE_MODAL" });

    dispatch({ type: "UPDATE_TEACHER", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};

//Get users from database
export const getTeachers = async (dispatch, currentUser) => {
  const result = await fetchData(
    { url, method: "GET", token: currentUser.token },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_TEACHERS", payload: result });
  }
};

export const deleteTeacher = async (teacher, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${teacher._id}`,
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
        message: "The teacher has been deleted successfully",
      },
    });

    dispatch({ type: "DELETE_TEACHER", payload: result._id });
  }

  dispatch({ type: "END_LOADING" });
};

export const updateTeacher = async (
  teacher,
  currentUser,
  dispatch,
) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${teacher.id}`,
      method: "PATCH",
      body: teacher,
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
        message: "The teacher has been updated successfully",
      },
    });

    dispatch({ type: "UPDATE_TEACHER", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};
