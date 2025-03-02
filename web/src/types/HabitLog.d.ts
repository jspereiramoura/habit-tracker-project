declare interface HabitLog {
  id: string;
  date: string;
  habitId: string;
  status: "completed" | "missed";
  habit: Habit;
};