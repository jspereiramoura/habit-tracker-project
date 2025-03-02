import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../config/api";

interface NewHabit {
  name: string;
  description?: string;
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const habitsApi = createApi({
  reducerPath: "habitsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/habits`,
    prepareHeaders: headers => {
      const token = getCookie("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["Habit", "HabitLogs"],
  endpoints: builder => ({
    getHabits: builder.query<
      Record<"all" | "completed" | "uncompleted", Habit[]>,
      void
    >({
      query: () => "/",
      providesTags: ["Habit"]
    }),
    addHabit: builder.mutation<Habit, NewHabit>({
      query: newHabit => ({
        url: "/",
        method: "POST",
        body: newHabit
      }),
      invalidatesTags: ["Habit"]
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
      invalidatesTags: ["Habit"]
    }),
    getHabitLogs: builder.query<
      Record<"all" | "completed" | "uncompleted", HabitLog[]>,
      string
    >({
      query: date => `/logs/?date=${date}`,
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
