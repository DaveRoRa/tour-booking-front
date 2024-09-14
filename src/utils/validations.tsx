import * as yup from "yup"

export const yupInteger = yup
  .number()
  .integer("Invalid integer")
  .typeError("Invalid integer")
export const yupIntegerRequired = yup
  .number()
  .integer("Invalid integer")
  .typeError("Invalid integer")
  .required("This field is required")
