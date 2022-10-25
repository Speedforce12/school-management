import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
// import { auth } from "../firebase";

const INITIAL_STATE = {
  currentUser: null,
  openLogin: false,
  openModal: false,
  openEdit: false,
  loading: false,
  alert: { open: false, severity: "info", message: "" },
  profile: { open: false, file: null, photoURL: "" },
  users: [],
  teachers: [],
  students: [],
  expenses: [],
  incomes: [],
  income: null,
  expense:null,
  student: null,
  teacher: null,
  info: {},
  editMode: false,
};

const AuthContext = createContext(INITIAL_STATE);

export const useValue = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  }, []);

  useEffect(() => {
    if (state.currentUser) {
      const user = JSON.parse(localStorage.getItem(state.currentUser));
      if (user) {
        dispatch({ type: "UPDATE_USER", payload: user });
      }
    }
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
