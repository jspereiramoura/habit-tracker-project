import { http, HttpResponse } from "msw";
import { API_URL } from "../../../../config/api";
import { mockedHabits } from "./mockedHabits";

export const habitHandlers = [
  http.get(API_URL + "/habits", () => {
    return HttpResponse.json(mockedHabits, { status: 200 });
  }),
  http.post(API_URL + "/habits", async ({ request }) => {
    const body = JSON.parse(await request.text());

    const newHabit: Habit = {
      name: body.name,
      tags: body.tags,
      id: mockedHabits.length.toString(),
      createdAt: body.createdAt ?? new Date().toISOString(),
      updatedAt: body.updatedAt ?? new Date().toISOString()
    };

    mockedHabits.push(newHabit);
    return HttpResponse.json(newHabit, { status: 201 });
  }),
  http.patch(API_URL + "/habits/:id", async ({ request, params }) => {
    const body = JSON.parse(await request.text());

    const currentHabit = mockedHabits.find(habit => habit.id === params.id);

    if (!currentHabit) {
      return HttpResponse.json("Habit not found", { status: 404 });
    }

    const updatedHabit = {
      ...currentHabit,
      name: body.name ?? currentHabit?.name,
      tags: body.tags ?? currentHabit?.tags,
      updatedAt: body.updatedAt ?? new Date().toISOString(),
    };

    mockedHabits.splice(
      mockedHabits.findIndex(habit => habit.id === params.id),
      1,
      updatedHabit
    );

    return HttpResponse.json(updatedHabit, { status: 200 });
  }),
  http.delete(API_URL + "/habits/:id", ({ params }) => {
    mockedHabits.splice(
      mockedHabits.findIndex(habit => habit.id === params.id),
      1
    );

    return HttpResponse.json({ id: params.id }, { status: 204 });
  })
];
