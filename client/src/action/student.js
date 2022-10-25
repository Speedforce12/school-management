import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/student";

export const createStudent = async (student, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url, body: student, token: currentUser?.token },
    dispatch
  );

  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        message: "The student has been added successfully",
        severity: "success",
      },
    });
    dispatch({ type: "CLOSE_MODAL" });

    dispatch({ type: "UPDATE_STUDENT", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};

export const getStudents = async (dispatch, currentUser) => {
  const result = await fetchData(
    { url, method: "GET", token: currentUser.token },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_STUDENTS", payload: result });
  }
};

export const deleteStudent = async (student, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${student._id}`,
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
        message: "The student has been deleted successfully",
      },
    });

    dispatch({ type: "DELETE_STUDENT", payload: result._id });
  }

  dispatch({ type: "END_LOADING" });
};

export const updateStudent = async (
  student,
  currentUser,
  dispatch,
) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${student.id}`,
      method: "PATCH",
      body: student,
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
        message: "The student has been updated successfully",
      },
    });

    dispatch({ type: "UPDATE_STUDENT", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};


