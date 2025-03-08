import { authHandlers } from "./handlers/authHandlers";
import { habitLogHandlers } from "./handlers/habitLogs/habitLogHandlers";
import { habitHandlers } from "./handlers/habits/habitHandlers";
import { habitStatisticsHandlers } from "./handlers/habitStatistics/habitStatisticHandler";

export const handlers = [
  ...habitHandlers,
  ...habitLogHandlers,
  ...authHandlers,
  ...habitStatisticsHandlers
];
