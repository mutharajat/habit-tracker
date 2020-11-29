declare type HabitData = {
  id: string;
  habit: string;
  day_1: boolean;
  day_2: boolean;
  day_3: boolean;
  day_4: boolean;
  day_5: boolean;
  day_6: boolean;
  day_7: boolean;
  reward: boolean;
};

declare type HabitDay =
  | "day_1"
  | "day_2"
  | "day_3"
  | "day_4"
  | "day_5"
  | "day_6"
  | "day_7";
