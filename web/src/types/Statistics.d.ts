declare interface HabitStatistics {
  id: string;
  habitId: string;
  totalLogs: number;
  completedLogs: number;
  completionRate: number;
  streakCurrent: number;
  streakLongest: number;
  createdAt: string;
  updatedAt: string;
}

declare interface Statistics {
  habitStatistics: HabitStatistics[];
}
