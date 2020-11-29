import { combineReducers } from "redux";
import habitsReducer from "./reducer";

export default combineReducers({
  habits: habitsReducer,
});
