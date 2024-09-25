import { Button, Stack, Typography } from "@mui/material"
import { Formik } from "formik"
import * as yup from "yup"
import {
  yupImageRequired,
  yupIntegerRequired,
  yupStringRequired,
} from "../../../utils/validations"
import FormikTextField from "../../../components/form/text-input"
import FormikImageField from "../../../components/form/image-input"

const validationSchema = yup.object().shape({
  title: yupStringRequired,
  duration: yupIntegerRequired.min(
    20,
    "El tour debe ser de al menos 20 minutos",
  ),
  images: yup
    .array()
    .of(yupImageRequired)
    .min(1, "Inserte al menos una imagen"),
})

const CreateTourPage = () => {
  return (
    <Stack>
      <Typography mt={2} mb={1} variant="h4">
        Create a new Tour Route
      </Typography>
      <Formik
        initialValues={{ title: "", images: [], duration: "" }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        {({ submitForm, isSubmitting }) => (
          <>
            <FormikTextField label="Título" name="title" required />
            <FormikTextField
              label="Duración"
              name="duration"
              type="integer"
              required
            />
            <FormikImageField name="images" required />
            <Button sx={{ mt: 4 }} onClick={submitForm} disabled={isSubmitting}>
              Salvar
            </Button>
          </>
        )}
      </Formik>
    </Stack>
  )
}

export default CreateTourPage
