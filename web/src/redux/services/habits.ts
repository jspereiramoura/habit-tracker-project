import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../config/api";
import prepareHeadersWithAuth from "../../utils/prepareHeadersWithAuth";
import { RootState } from "../store";

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
      async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState;
        const dashboardDate = state.dashboard.selectedDate;

        const patchResult = dispatch(
          habitsApi.util.updateQueryData(
            "getHabitLogs",
            dashboardDate,
            draft => {
              const newDraft = draft.filter(log => log.habitId !== id);
              return newDraft;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    getHabitLogs: builder.query<HabitLog[], string>({
      query: date => `/logs/?date=${date}`,
      providesTags: ["HabitLogs"]
    }),
    updateHabitLog: builder.mutation<HabitLog, Partial<HabitLog>>({
      invalidatesTags: ["HabitLogs"],
      query: ({ id, ...updatedData }) => ({
        url: `/logs/${id}`,
        method: "PATCH",
        body: updatedData
      }),
      async onQueryStarted({ ...updatedData }, { dispatch, getState }) {
        const state = getState() as RootState;
        const dashboardDate = state.dashboard.selectedDate;

        dispatch(
          habitsApi.util.updateQueryData(
            "getHabitLogs",
            dashboardDate,
            draft => {
              const habitLogIndex = draft.findIndex(
                log => log.id === updatedData.id
              );

              draft[habitLogIndex] = {
                ...draft[habitLogIndex],
                ...updatedData
              };
            }
          )
        );
      }
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
