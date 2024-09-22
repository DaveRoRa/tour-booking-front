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
