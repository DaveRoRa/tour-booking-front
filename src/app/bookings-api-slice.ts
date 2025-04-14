import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type BookingType = {
  id: number
  adults_amount?: number
  kids_amount?: number
  user_id: number
  tour_route_id?: number
  canceledBy_user_id?: null | number
  booking_time: string
  booking_date: string
  canceledAt?: null | string
  createdAt?: string
  updatedAt?: string
}

export const bookingsApiSlice = createApi({
  reducerPath: "bookingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_PUBLIC_BACK_ENDPOINT}/bookings`,
  }),
  endpoints: builder => ({
    getBookingsByMonth: builder.query<
      BookingType[],
      {
        initialDate: string
        tour_route_id: string
      }
    >({
      query: ({ initialDate, tour_route_id }) =>
        `find-by-month?initialDate=${initialDate}&tour_route_id=${tour_route_id}`,
    }),
  }),
})

export const { useGetBookingsByMonthQuery } = bookingsApiSlice
