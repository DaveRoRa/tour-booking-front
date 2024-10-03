import {
  Button,
  FormHelperText,
  IconButton,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material"
import { FieldArray, Formik } from "formik"
import * as yup from "yup"

import { toast } from "react-toastify"
import { Delete } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import {
  validateCloudinaryMedia,
  yupImageRequired,
  yupIntegerRequired,
  yupStringRequired,
} from "../../utils/validations"
import axiosInstance, { parseError, uploadMedia } from "../../utils/requests"
import FormikTextField from "./text-input"
import FormikTimeField from "./time-input"
import FormikImageField from "./image-input"
import type {
  CloudinaryMedia,
  TourRouteType,
} from "../../app/tour-routers-api-slice"

type CreateRouteBody = {
  title: string
  duration: number | ""
  pictures: (File | CloudinaryMedia)[]
  available_times: string[]
}

const validationSchema = yup.object().shape({
  title: yupStringRequired,
  duration: yupIntegerRequired.min(
    20,
    "El tour debe ser de al menos 20 minutos",
  ),
  pictures: yup
    .array()
    .of(yupImageRequired)
    .min(1, "Inserte al menos una imagen"),
  available_times: yup
    .array()
    .of(yup.string())
    .min(1, "Inserte al menos una hora")
    .test(
      "unique",
      "No puede haber horarios duplicados",
      value => value!.length === new Set(value).size,
    )
    .test("filled", "No puede haber horarios vacíos", value =>
      value!.every(item => !!item),
    ),
})

const initialValues: CreateRouteBody = {
  title: "",
  pictures: [],
  duration: "",
  available_times: [""],
}

const TourRouteForm = ({ data }: { data?: TourRouteType }) => {
  const navigate = useNavigate()

  const createTour = async (values: CreateRouteBody) => {
    const uploadedImages = await Promise.all(
      (values.pictures as File[]).map(file => uploadMedia(file)),
    )

    const response = await axiosInstance.post("/tour-routes/create", {
      ...values,
      pictures: uploadedImages,
    })
    toast.success("Ruta creada con éxito")
    navigate(`/routes/find/${response.data.data.id}`)
  }

  const checkIfAnyFieldChanged = (values: CreateRouteBody) => {
    if (
      values.title !== data!.title ||
      values.duration !== data!.duration ||
      values.available_times.length !== data!.available_times.length ||
      values.pictures.length !== data!.pictures.length
    ) {
      return true
    }
    if (
      !values.available_times.every(time =>
        data!.available_times.includes(time),
      )
    ) {
      return true
    }
    if (values.pictures.some(item => !validateCloudinaryMedia(item))) {
      return true
    }
    return false
  }

  const updateTour = async (values: CreateRouteBody) => {
    if (checkIfAnyFieldChanged(values)) {
      const uploadedImages = await Promise.all(
        (
          values.pictures.filter(
            image => !validateCloudinaryMedia(image),
          ) as File[]
        ).map(file => uploadMedia(file)),
      )

      const response = await axiosInstance.post(
        `/tour-routes/update/${data!.id}`,
        {
          ...values,
          pictures: [
            ...uploadedImages,
            values.pictures.filter(image => validateCloudinaryMedia(image)),
          ],
        },
      )
      toast.success("Ruta modificada con éxito")
      navigate(`/routes/find/${response.data.data.id}`)
    } else {
      toast.info("No se modificó ningún campo")
    }
  }

  const handleValidation = async (values: CreateRouteBody) => {
    try {
      if (data) {
        await updateTour(data)
      } else {
        await createTour(values)
      }
    } catch (error) {
      toast.error(parseError(error).message)
    }
  }

  const { id, createdAt, updatedAt, ...initialData } = data || {
    ...initialValues,
    id: 0,
    createdAt: "",
    updatedAt: "",
  }
  return (
    <Stack>
      <Typography mt={2} mb={1} variant="h4">
        Create a new Tour Route
      </Typography>
      <Formik
        initialValues={initialData}
        onSubmit={handleValidation}
        validationSchema={validationSchema}
      >
        {({ submitForm, isSubmitting, values, errors }) => (
          <>
            <FormikTextField label="Título" name="title" required />
            <FormikTextField
              label="Duración (minutos)"
              name="duration"
              type="integer"
              required
            />
            <FieldArray
              name="available_times"
              render={({ push, remove }) => (
                <Stack my={1}>
                  <InputLabel
                    error={!!errors.available_times}
                    sx={{ mb: -0.5, ml: 2, zIndex: 1 }}
                    shrink
                  >
                    Horarios disponibles*
                  </InputLabel>
                  <Stack
                    gap={1}
                    p={1}
                    border={({ palette }) =>
                      `1px dashed ${errors.available_times ? palette.error.main : palette.grey[400]}`
                    }
                    borderRadius={2}
                  >
                    {values.available_times.map((_, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        gap={1}
                        justifyItems="center"
                      >
                        <FormikTimeField
                          name={`available_times[${index}]`}
                          isInList
                        />
                        <Stack justifyContent="center">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => remove(index)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Stack>
                    ))}
                    <Button variant="outlined" onClick={() => push("")}>
                      Agregar horario
                    </Button>
                  </Stack>
                  {!!errors.available_times && (
                    <FormHelperText sx={{ mt: 0.5, mx: 1.8 }} error>
                      {errors.available_times}
                    </FormHelperText>
                  )}
                </Stack>
              )}
            />
            <FormikImageField name="pictures" required />
            <Button sx={{ mt: 4 }} onClick={submitForm} disabled={isSubmitting}>
              Salvar
            </Button>
          </>
        )}
      </Formik>
    </Stack>
  )
}

export default TourRouteForm
