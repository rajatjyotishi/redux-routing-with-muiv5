import { createSlice } from "@reduxjs/toolkit";
import { setCounter } from "../actions";

const initialState = {
  counter: 0,
};

const appSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {},
  extraReducers: {
    [setCounter]: (state, action) => {
      state.counter = action.payload;
    },
    // NOTE: For API calls
    // [sampleAction.fulfilled]: (state, action) => {
    //   state.sample = action.payload.sampleData || [];
    // },
    // [sampleAction.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [sampleAction.rejected]: (state, action) => {
    //   state.isLoading = false;
    // },
  },
});

export default appSlice;
