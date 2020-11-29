declare type HabitsStore = { [id: string]: HabitData };

declare type ReduxStore = {
  habits: HabitsStore;
};
