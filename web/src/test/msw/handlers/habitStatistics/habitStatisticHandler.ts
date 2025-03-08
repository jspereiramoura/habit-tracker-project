import { http, HttpResponse } from "msw";
import { API_URL } from "../../../../config/api";
import { mockedStatistics } from "./mockedHabitStatistics";

export const habitStatisticsHandlers = [
  http.get(API_URL + "/statistics", () => {
    return HttpResponse.json(
      mockedStatistics,
      { status: 200 }
    );
  })
];
