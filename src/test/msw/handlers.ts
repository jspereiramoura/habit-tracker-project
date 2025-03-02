import { authHandlers } from "./handlers/authHandlers";
import { habitLogHandlers } from "./handlers/habitLogs/habitLogHandlers";
import { habitHandlers } from "./handlers/habits/habitHandlers";

export const handlers = [
  ...habitHandlers,
  ...habitLogHandlers,
  ...authHandlers
];
