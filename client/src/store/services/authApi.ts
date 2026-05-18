import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'user/login',
                method: 'POST',
                body: credentials,
            })
        }),

        signup: builder.mutation({
            query: (credentials) => ({
                url: 'user/register',
                method: 'POST',
                body: credentials
            })
        }),

        checkAuthentication: builder.query({
            query: () => "user/check"
        })
    })
})

export const { useLoginMutation, useSignupMutation, useLazyCheckAuthenticationQuery } = authApi;