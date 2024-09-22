import { Button, CircularProgress, Stack } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import type { FormikHelpers } from "formik"
import { Formik } from "formik"
import * as yup from "yup"
import { yupStringInteger, yupStringRequired } from "../../utils/validations"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectUser, updateMyselfUser } from "../../app/user-slice"
import { Navigate } from "react-router-dom"
import FormikTextField from "../../components/form/text-input"

type ProfileBody = {
  name: string
  email: string
  phone: string
}

const validationSchema = yup.object().shape({
  name: yupStringRequired,
  email: yupStringRequired.email("Formato de email incorrecto"),
  phone: yupStringInteger,
})

const ProfilePage = () => {
  const { user, status } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  if (status === "loading") {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <CircularProgress sx={{ fontSize: 100 }} />
      </Stack>
    )
  }

  if (!user) {
    return <Navigate to="/auth/login" />
  }

  const handleSubmit = async (
    values: ProfileBody,
    helpers: FormikHelpers<ProfileBody>,
  ) => {
    helpers.setSubmitting(true)
    await dispatch(updateMyselfUser(values))

    helpers.setSubmitting(false)
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, submitForm, values }) => (
        <Stack alignItems="center">
          <AccountCircleIcon sx={{ fontSize: 100 }} />
          <FormikTextField label="Nombre" name="name" required />
          <FormikTextField label="Email" name="email" required />
          <FormikTextField label="Teléfono" name="phone" type="stringInteger" />
          <Button
            disabled={
              isSubmitting ||
              (values.email === user.email &&
                values.name === user.name &&
                (values.phone === user.phone || (!values.phone && !user.phone)))
            }
            sx={{ mt: 3 }}
            fullWidth
            onClick={submitForm}
          >
            Guardar cambios
          </Button>
        </Stack>
      )}
    </Formik>
  )
}

export default ProfilePage
