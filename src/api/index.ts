import axios, { Method } from "axios";
import moment from "moment";

const habitsAPI = axios.create({
  baseURL: "https://cryptic-coast-95268.herokuapp.com/api/v1/habits",
});

const errorHandler = (err: any) => {
  console.log("errMessage:" + err);
};

const makeRequest = async (method: Method, url: string, data?: object) => {
  try {
    const response = await habitsAPI.request({
      method,
      data,
      url,
    });
    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

export const getHabits = async () => {
  const data = await makeRequest("GET", "/");
  return data;
};

export const updateHabitDay = async (habitId: string, day: HabitDay) => {
  const dayNum = parseInt(day.split("_")[1]);

  const formattedDate = moment()
    .startOf("week")
    .add(dayNum - 1, "days")
    .format("L");
  const data = await makeRequest("PUT", "/reps", {
    habitId,
    day: formattedDate,
  });
  return data;
};

export const addHabit = async (habit: string, time: Date, repeat: number) => {
  const formattedTime = moment(time).format("LT");
  const data = await makeRequest("POST", "/", {
    habit,
    time: formattedTime,
    repeat,
  });
  return data;
};
