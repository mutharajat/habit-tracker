import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { getHabits, updateHabitDay, addHabit as addHabitAPI } from "../api";
import { ADD_HABIT, FETCH_HABITS, TOGGLE_HABIT_DAY } from "./types";

export const fetchHabits = (): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch
) => {
  const data = await getHabits();
  dispatch({ type: FETCH_HABITS, payload: data });
};

export const toggleHabitDay = (
  id: string,
  day: HabitDay
): ThunkAction<void, {}, {}, AnyAction> => async (dispatch) => {
  const data = await updateHabitDay(id, day);
  dispatch({ type: TOGGLE_HABIT_DAY, payload: data });
};

export const addHabit = (
  habit: string,
  repeat: number,
  time: Date
): ThunkAction<void, {}, {}, AnyAction> => async (dispatch) => {
  const data = await addHabitAPI(habit, time, repeat);
  dispatch({ type: ADD_HABIT, payload: data });
};
