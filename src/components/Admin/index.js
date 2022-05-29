import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { setCounter } from "../../redux/actions";

const Admin = () => {
  const dispatch = useDispatch();
  const { counter } = useSelector((state) => state.appReducer);

  const incHandler = () => {
    dispatch(setCounter(counter + 1));
  };
  return (
    <>
      Counter: {counter}
      <Button variant="contained" color="primary" onClick={incHandler}>
        Inc
      </Button>
    </>
  );
};

export default Admin;
