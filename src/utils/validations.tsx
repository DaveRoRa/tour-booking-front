import * as yup from "yup"
import type { CloudinaryMedia } from "../app/tour-routers-api-slice"

export const yupInteger = yup
  .number()
  .integer("Número entero inválido")
  .typeError("INúmero entero inválido")
export const yupIntegerRequired = yup
  .number()
  .integer("Número entero inválido")
  .typeError("Número entero inválido")
  .required("Este campo es obligatorio")
export const yupStringRequired = yup
  .string()
  .required("Este campo es obligatorio")
export const yupString = yup.string()
export const yupStringInteger = yup
  .string()
  .matches(/^(\d+)?$/, "Este campo solo puede contener números enteros")
  .nullable()
export const yupStringIntegerRequired = yupStringRequired.matches(
  /^(\d+)?$/,
  "Este campo solo puede contener números enteros",
)

const validateFileType = (file: any, acceptedTypes?: string[]): boolean => {
  if (file && file instanceof File) {
    if (acceptedTypes?.length) {
      if (file?.type) {
        const fileType = file.type
        return acceptedTypes.includes(fileType)
      }
      return false
    }
    return true
  }
  return false
}

export const validateCloudinaryMedia = (obj: any): obj is CloudinaryMedia => {
  if (typeof obj !== "object" || obj === null) {
    return false
  }

  const requiredFields = [
    "url",
    "etag",
    "tags",
    "type",
    "bytes",
    "width",
    "folder",
    "format",
    "height",
    "version",
    "asset_id",
    "public_id",
    "created_at",
    "secure_url",
    "version_id",
    "placeholder",
    "resource_type",
    "original_filename",
  ]

  for (const field of requiredFields) {
    if (!(field in obj)) {
      return false
    }
  }

  if (!Array.isArray(obj.tags)) {
    return false
  }

  return true
}

const acceptedImages = ["image/jpeg", "image/jpg", "image/png", "image/gif"]

export const yupImageRequired = yup
  .mixed()
  .test("fileType", "Tipo de archivo inválido", (value: any) => {
    const isValid =
      validateFileType(value, acceptedImages) || validateCloudinaryMedia(value)
    return isValid
  })
  .required("Este campo es obligatorio")
