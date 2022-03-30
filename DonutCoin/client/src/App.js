import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startInit } from "./reducer/coinReducer";
import MainRouter from "./Router/MainRouter";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);

  return <MainRouter />;
}

export default App;
