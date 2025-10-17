import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mealsApi = createApi({
  reducerPath: 'mealsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Meal'],
  endpoints: (builder) => ({
    getMeals: builder.query<any[], void>({
      query: () => '/meals',
      providesTags: ['Meal']
    }),
    createOrder: builder.mutation<any, { userId: number; mealId: number }>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Meal']
    })
  })
});

export const { useGetMealsQuery, useCreateOrderMutation } = mealsApi;
