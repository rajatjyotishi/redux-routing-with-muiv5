/**
 * NOTE: Uncomment when implementing Authentication flow.
 */
import appSlice from "./appReducer";
import { combineReducers } from "@reduxjs/toolkit";
// import { logout, fetchTokenInfo } from '../actions';
// import { windowStore } from "util/windowStore";

const appReducer = combineReducers({
  appReducer: appSlice.reducer,
});

export default function rootReducer(state, action) {
  /**
   * Reset global state and clear window stored data
   *  If user logs out successfully or refreshing token fails
   */
  // if (logout.fulfilled.match(action) || fetchTokenInfo.rejected.match(action)) {
  // 	// Reducer will return the initial state when it receives undefined,
  // 	// thus resetting the entire global store and booting user off to login page
  // 	windowStore.clear();
  // 	state = undefined;
  // }

  return appReducer(state, action);
}
