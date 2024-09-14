import type { ParsedErrorType } from "../utils/requests"
import { axiosInstance, parseError } from "../utils/requests"
import { createAppSlice } from "./createAppSlice"

type UserType = {
  id: number
  name: string
  email: string
  type: "super-admin" | "client"
  phone?: string
  avatar?: string
}

export interface UserSliceState {
  user: UserType | null
  status: "idle" | "loading" | "failed"
  error: ParsedErrorType | null
}

const initialState: UserSliceState = {
  status: "idle",
  user: null,
  error: null,
}

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    loginUser: create.asyncThunk(
      async (credentials: {
        email: string
        password: string
        rememberMe: boolean
      }) => {
        const results = await axiosInstance.post<UserType>(
          "/auth/login",
          credentials,
        )
        return results.data
      },
      {
        pending: state => {
          state.status = "loading"
          state.error = null
        },
        rejected: (state, { error }) => {
          state.status = "failed"
          state.error = parseError(error)
        },
        fulfilled: (state, { payload }) => {
          state.user = payload
          state.status = "idle"
        },
      },
    ),
  }),
})

export const { loginUser } = userSlice.actions
