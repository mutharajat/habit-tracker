import _ from "lodash";
import { AnyAction } from "redux";
import { ADD_HABIT, FETCH_HABITS, TOGGLE_HABIT_DAY } from "./types";

const initialState: HabitsStore = {};

const habitsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_HABITS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case TOGGLE_HABIT_DAY:
      return { ...state, [action.payload.id]: action.payload };
    case ADD_HABIT:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default habitsReducer;
