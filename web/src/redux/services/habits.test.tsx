import { waitFor } from "@testing-library/dom";
import { act, renderHook } from "@testing-library/react";
import { mockedHabitLogs } from "../../test/msw/handlers/habitLogs/mockedHabitLogs";
import { renderWithProviders } from "../../test/utils/renderWithProviders";
import {
  useAddHabitMutation,
  useDeleteHabitMutation,
  useGetHabitLogsQuery,
  useGetHabitsQuery,
  useUpdateHabitLogMutation,
  useUpdateHabitMutation
} from "./habits";
import { mockedHabits } from "../../test/msw/handlers/habits/mockedHabits";

describe("Services: Habits", () => {
  it("getHabits: should return a list of habits", async () => {
    const { wrapper } = renderWithProviders(<></>);
    const { result } = renderHook(() => useGetHabitsQuery(), {
      wrapper
    });

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(mockedHabits);
    });
  });

  it("addHabit: should add a new habit", async () => {
    const { wrapper } = renderWithProviders(<></>);
    const { result } = renderHook(() => useAddHabitMutation(), {
      wrapper
    });

    const newHabit = {
      id: "3",
      name: "Teste",
      tags: ["Teste"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Habit;

    let data: unknown;
    const [mutation] = result.current;

    await act(async () => {
      data = await mutation(newHabit);
    });

    await waitFor(() => {
      expect(data).toStrictEqual({
        data: newHabit
      });
    });
  });

  it("updateHabit: should update a habit", async () => {
    const { wrapper } = renderWithProviders(<></>);
    const { result } = renderHook(() => useUpdateHabitMutation(), {
      wrapper
    });

    const updatedHabit = {
      name: "Teste",
      updatedAt: new Date().toISOString()
    };

    let data: unknown;
    const [mutation] = result.current;
    const mockedHabit = mockedHabits[0];
    await act(async () => {
      data = await mutation({ id: mockedHabit.id, ...updatedHabit });
    });

    await waitFor(() => {
      expect(data).toStrictEqual({
        data: {
          ...mockedHabit,
          ...updatedHabit
        }
      });
    });
  });

  it("deleteHabit: should delete a habit", async () => {
    const { wrapper } = renderWithProviders(<></>);
    const { result } = renderHook(() => useDeleteHabitMutation(), {
      wrapper
    });

    const [mutation] = result.current;
    const mockedHabit = mockedHabits[0];

    expect(mockedHabits).toContain(mockedHabit);

    await act(async () => {
      await mutation(mockedHabit.id);
    });

    expect(mockedHabits).not.toContain(mockedHabit);
  });

  it("getHabitLogs: should return a list of habit logs separated by status", async () => {
    const { wrapper } = renderWithProviders(<></>);
    const { result } = renderHook(() => useGetHabitLogsQuery("2025-02-28"), {
      wrapper
    });

    const filteredByDate = mockedHabitLogs.filter(
      predicate => predicate.date === "2025-02-28"
    );

    const completedMock = filteredByDate.filter(
      predicate => predicate.status === "completed"
    );
    const uncompletedMock = filteredByDate.filter(
      predicate => predicate.status === "missed"
    );

    await waitFor(() => {
      expect(result.current.data?.all).toEqual(filteredByDate);
      expect(result.current.data?.completed).toEqual(completedMock);
      expect(result.current.data?.uncompleted).toEqual(uncompletedMock);
    });
  });

  it("updateHabitLog: should update a habit log", async () => {
    const firstHabitLog = mockedHabitLogs[0];
    const { wrapper } = renderWithProviders(<></>);
    const { result } = renderHook(() => useUpdateHabitLogMutation(), {
      wrapper
    });

    const updatedHabitLog = {
      id: firstHabitLog.id,
      status: "completed"
    } as HabitLog;

    let data: unknown;
    const [mutation] = result.current;

    await act(async () => {
      data = await mutation(updatedHabitLog);
    });

    await waitFor(() => {
      expect(data).toStrictEqual({
        data: {
          ...firstHabitLog,
          ...updatedHabitLog
        }
      });
    });
  });
});
