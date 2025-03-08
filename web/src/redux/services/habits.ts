import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../config/api";
import prepareHeadersWithAuth from "../../utils/prepareHeadersWithAuth";

interface NewHabit {
  name: string;
  tags?: string[];
  description?: string;
}

export const habitsApi = createApi({
  reducerPath: "habitsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/habits`,
    prepareHeaders: prepareHeadersWithAuth
  }),
  tagTypes: ["Habit", "HabitLogs"],
  endpoints: builder => ({
    getHabits: builder.query<Habit[], void>({
      query: () => "/",
      providesTags: ["Habit"]
    }),
    addHabit: builder.mutation<Habit, NewHabit>({
      query: newHabit => ({
        url: "/",
        method: "POST",
        body: newHabit
      }),
      invalidatesTags: ["Habit", "HabitLogs"]
    }),
    updateHabit: builder.mutation<Habit, Partial<Habit>>({
      query: ({ id, ...updatedData }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: updatedData
      }),
      invalidatesTags: ["Habit"]
    }),
    deleteHabit: builder.mutation<{ success: boolean }, string>({
      query: id => ({
        url: `/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Habit", "HabitLogs"]
    }),
    getHabitLogs: builder.query<
      Record<"all" | "completed" | "uncompleted", HabitLog[]>,
      string
    >({
      query: date => `/logs/?date=${date}`,
      providesTags: ["HabitLogs"],
      transformResponse: (response: HabitLog[]) => {
        return {
          all: response,
          completed: response?.filter(
            (habit: HabitLog) => habit.status === "completed"
          ),
          uncompleted: response?.filter(
            (habit: HabitLog) => habit.status === "missed"
          )
        };
      }
    }),
    updateHabitLog: builder.mutation<HabitLog, Partial<HabitLog>>({
      invalidatesTags: ["HabitLogs"],
      query: ({ id, ...updatedData }) => ({
        url: `/logs/${id}`,
        method: "PATCH",
        body: updatedData
      })
    })
  })
});

export const {
  useGetHabitsQuery,
  useAddHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  useGetHabitLogsQuery,
  useUpdateHabitLogMutation
} = habitsApi;
