import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../config/api";
import prepareHeadersWithAuth from "../../utils/prepareHeadersWithAuth";

export const statisticsApi = createApi({
  reducerPath: "statisticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/statistics`,
    prepareHeaders: prepareHeadersWithAuth
  }),
  endpoints: builder => ({
    getStatistics: builder.query<Statistics, void>({
      query: () => "/"
    })
  })
});

export const { useGetStatisticsQuery } = statisticsApi;
