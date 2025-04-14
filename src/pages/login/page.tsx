import { Button, Link, Typography } from "@mui/material"
import type { FormikHelpers } from "formik"
import { Formik } from "formik"
import * as yup from "yup"
import FormikTextField from "../../components/form/text-input"
import FormikCheckBox from "../../components/form/checkbox-input"
import { parseError } from "../../utils/requests"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../app/hooks"
import { loginUser } from "../../app/user-slice"
import { useNavigate, useSearchParams } from "react-router-dom"
import { yupStringRequired } from "../../utils/validations"

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("Este campo es obligatorio"),
  password: yupStringRequired,
})

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  console.log("sesearchParasarch :>> ", searchParams.get("previous_url"))
  const handleSubmit = async (
    values: {
      email: string
      password: string
      rememberMe: boolean
    },
    formikHelpers: FormikHelpers<{
      email: string
      password: string
      rememberMe: boolean
    }>,
  ) => {
    const response = await dispatch(loginUser(values))
    if ((response as any).error) {
      toast.error(parseError((response as any).error).message)
      formikHelpers.setSubmitting(false)
    } else {
      const previous_url = searchParams.get("previous_url")
      const redirect_to =
        previous_url && previous_url.startsWith("/") ? previous_url : "/"
      navigate(redirect_to)
    }
  }

  return (
    <Formik
      initialValues={{ email: "", password: "", rememberMe: false }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ submitForm }) => (
        <>
          <Typography
            fontSize={28}
            fontWeight={700}
            color={({ palette }) => palette.primary.main}
          >
            GuruWalk
          </Typography>
          <Typography
            color={({ palette }) => palette.grey[800]}
            fontSize={20}
            fontWeight={700}
            pb={2}
          >
            ¡Te da la bienvenida!
          </Typography>
          <FormikTextField label="Email" type="email" name="email" required />
          <FormikTextField
            label="Contraseña"
            type="password"
            name="password"
            required
          />
          <FormikCheckBox label="Recuérdame" name="rememberMe" />
          <Button sx={{ mb: 5 }} fullWidth onClick={submitForm}>
            Continuar
          </Button>
          <Link mb={2}>¿Olvidaste tu contraseña?</Link>
          <Typography>
            ¿Todavía no tienes cuenta? <Link>Regístrate</Link>
          </Typography>
        </>
      )}
    </Formik>
  )
}

export default LoginPage
