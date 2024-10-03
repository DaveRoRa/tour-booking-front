import axios from "axios"
import { toast } from "react-toastify"
import type { CloudinaryMedia } from "../app/tour-routers-api-slice"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACK_ENDPOINT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
})
export default axiosInstance

axiosInstance.interceptors.response.use(undefined, function (error: any) {
  const preParsedMessage = error.response.data
  if (typeof preParsedMessage?.message === "string") {
    error.message = preParsedMessage.message
  }
  if (Array.isArray(preParsedMessage.errors)) {
    const parsedMessage = preParsedMessage.errors
      .map((item: any) => item.msg)
      .join(". ")
    error.message = parsedMessage
  }
  return Promise.reject(error)
})

const getErrorMessage = (error: any) => {
  if (typeof error?.response?.data?.message === "string") {
    return error.response.data.message
  }
  if (error?.response?.data?.errors?.length) {
    return error.response.data.errors.map((err: any) => err.msg).join(". ")
  }
  if (error?.message) {
    return error.message
  }
  return "An error occured"
}

const getErrorStatus = (error: any) => {
  if (!isNaN(Number.parseInt(error?.code))) {
    return Number.parseInt(error.code)
  }
  if (error?.response?.status) {
    return error.response.status
  }
  return 500
}

const getErrorData = (error: any) => {
  return error?.response?.data || null
}

export type ParsedErrorType = ReturnType<typeof parseError>

export const parseError = (error: any) => {
  return {
    message: getErrorMessage(error),
    data: getErrorData(error),
    status: getErrorStatus(error),
  }
}

export const toastError = (error: any) => {
  const parsedError = parseError(error)
  toast.error(parsedError.message)
  return parsedError
}

export const uploadMedia = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  const response = await axiosInstance.post<CloudinaryMedia>("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  })
  return response.data
}
