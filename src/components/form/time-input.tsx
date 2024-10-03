import { FormControl, FormHelperText } from "@mui/material"
import { TimePicker } from "@mui/x-date-pickers"
import { useField } from "formik"
import type { Moment } from "moment"
import moment from "moment"
import { useMemo } from "react"

type FormikTimeFieldProps = {
  name: string
  label?: string
  required?: boolean
  isInList?: boolean
}

const FormikTimeField = ({
  label,
  name,
  required,
  isInList,
}: FormikTimeFieldProps) => {
  const [{ value }, { error }, { setValue }] = useField(name)

  const datifiedValue = useMemo(() => {
    if (!value || typeof value !== "string") {
      return null
    }
    return moment(value, "HH:mm:ss")
  }, [value])

  return (
    <FormControl sx={{ flex: 1, ...(!isInList && { pt: 2, pb: 1 }) }}>
      <TimePicker
        label={isInList ? undefined : `${label}${required ? "*" : ""}`}
        name={name}
        value={datifiedValue}
        onChange={newValue => {
          const valueToString = (newValue as Moment).format("HH:mm:ss")
          setValue(valueToString, true)
        }}
        slotProps={{
          openPickerIcon: { fontSize: "small" },
          openPickerButton: { size: "small" },
          textField: {
            error: !isInList && !!error,
          },
        }}
      />
      {!isInList && !!error && (
        <FormHelperText error sx={{ mt: 0.5, mx: 1.8 }}>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default FormikTimeField
