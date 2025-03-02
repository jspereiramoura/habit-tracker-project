import { http, HttpResponse } from "msw";
import { API_URL } from "../../../../config/api";
import { mockedHabitLogs } from "./mockedHabitLogs";

export const habitLogHandlers = [
  http.get(API_URL + "/habits/logs", ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get("date");

    const habitLogs = mockedHabitLogs.filter(
      habitLog => habitLog.date === date
    );

    return HttpResponse.json(habitLogs, { status: 200 });
  }),

  http.patch(API_URL + "/habits/logs/:id", async ({ request, params }) => {
    const body = JSON.parse(await request.text());

    const currentHabitLog = mockedHabitLogs.find(
      habitLog => habitLog.id === params.id
    );

    if (!currentHabitLog) {
      return HttpResponse.json("Habit log not found", { status: 404 });
    }

    const updatedHabitLog = {
      ...currentHabitLog,
      status: body.status ?? currentHabitLog?.status
    };

    mockedHabitLogs.splice(
      mockedHabitLogs.findIndex(habitLog => habitLog.id === params.id),
      1,
      updatedHabitLog
    );

    return HttpResponse.json(updatedHabitLog, { status: 200 });
  })
];
