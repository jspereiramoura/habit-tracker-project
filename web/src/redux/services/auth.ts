import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../config/api";

interface Credentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
}

export interface AuthOutput {
  user: { mail: string; uuid: string; username: string };
  access_token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/auth` }),
  endpoints: builder => ({
    login: builder.mutation<AuthOutput, Credentials>({
      query: credentials => ({
        url: "login",
        method: "POST",
        body: credentials
      })
    }),
    register: builder.mutation<AuthOutput, RegisterCredentials>({
      query: credentials => ({
        url: "register",
        method: "POST",
        body: {
          mail: credentials.email,
          username: credentials.username,
          password: credentials.password
        }
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation } = authApi;
