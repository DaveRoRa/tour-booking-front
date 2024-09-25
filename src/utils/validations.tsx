import * as yup from "yup"

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

const acceptedImages = ["image/jpeg", "image/jpg", "image/png", "image/gif"]

export const yupImageRequired = yup
  .mixed()
  .test("fileType", "Tipo de archivo inválido", (value: any) => {
    const isValid = validateFileType(value, acceptedImages)
    return isValid
  })
  .required("Este campo es obligatorio")
