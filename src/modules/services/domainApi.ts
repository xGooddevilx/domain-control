import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../env/env';

export const domainApi = createApi({
  reducerPath: 'domainApi',
  baseQuery: fetchBaseQuery({
    baseUrl:env.VITE_API_BASE_URL,
  }),
  tagTypes: ['Domain'],
  endpoints: (builder) => ({
    getDomains: builder.query<any[], void>({
      query: () => '/',
      providesTags: ['Domain'],
    }),
    getDomainById: builder.query<any, string>({
      query: (id) => `/${id}`,
    }),
    addDomain: builder.mutation<any, Partial<any>>({
      query: (newDomain) => ({
        url: '/',
        method: 'POST',
        body: newDomain,
      }),
      invalidatesTags: ['Domain'],
    }),
    updateDomain: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Domain'],
    }),
    deleteDomain: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Domain'],
    }),
  }),
})

export const {
  useGetDomainsQuery,
  useAddDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
  useGetDomainByIdQuery,
} = domainApi
