import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type CloudinaryMedia = {
  url: string
  etag: string
  tags: string[]
  type: string
  bytes: number
  width: number
  folder: string
  format: string
  height: number
  version: number
  asset_id: string
  public_id: string
  created_at: string
  secure_url: string
  version_id: string
  placeholder: false
  resource_type: string
  original_filename: string
}

export type TourRouteType = {
  id: number
  title: string
  //Representing minutes
  duration: number
  pictures: CloudinaryMedia[]
  available_times: string[]
  createdAt?: string
  updatedAt?: string
}

type AllTourRoutes = { totalCount: number; data: TourRouteType[] }

export const tourRoutesApiSlice = createApi({
  reducerPath: "tourRoutesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_PUBLIC_BACK_ENDPOINT}/tour-routes`,
  }),
  endpoints: builder => ({
    getTourRouteById: builder.query<TourRouteType, string>({
      query: id => `find/${id}`,
    }),
    getAllTourRoutes: builder.query<AllTourRoutes, number>({
      query: page => `find?page=${page}`,
    }),
  }),
})

export const { useGetTourRouteByIdQuery, useGetAllTourRoutesQuery } =
  tourRoutesApiSlice
