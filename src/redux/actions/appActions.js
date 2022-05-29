import {
  // createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
// import { sampleApiAxiosCall } from 'util/Api/user';

// NOTE: For API axios calls
// export const sampleAction = createAsyncThunk(
// 	'sampleAction',
// 	async ({ parameter }, { rejectWithValue }) => {
// 		try {
// 			return await sampleApiAxiosCall({ parameter });
// 		} catch (err) {
// 			return rejectWithValue(err);
// 		}
// 	}
// );

export const setCounter = createAction("setCounter");
