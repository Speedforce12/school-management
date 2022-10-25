import React from "react";
import { useValue } from "../../context/AuthContext"
import AccessMessage from "./AccessMessage";

const Protected = ({ children }) => {
  const {
    state: { currentUser },
  } = useValue();

  return currentUser ? children : <AccessMessage />;
};

export default Protected;
