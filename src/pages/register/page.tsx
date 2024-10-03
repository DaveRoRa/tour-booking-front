import { Formik } from "formik"
import * as yup from "yup"
import { yupStringInteger, yupStringRequired } from "../../utils/validations"
import FormikTextField from "../../components/form/text-input"
import { Button, Link, Typography } from "@mui/material"
import { useState } from "react"
import axiosInstance, { parseError } from "../../utils/requests"
import { toast } from "react-toastify"

type RegisterBody = {
  name: string
  email: string
  phone?: string
  password: string
  confirmedPassword: string
}

const validationSchemaUser = yup.object().shape({
  name: yupStringRequired,
  email: yupStringRequired.email("Formato de email inválido"),
  phone: yupStringInteger,
  password: yupStringRequired,
  confirmedPassword: yupStringRequired.oneOf(
    [yup.ref("password")],
    "Este campo debe coincidir con el de contraseña",
  ),
})

const RegisterPage = () => {
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)

  const handleSubmit = async (
    values: RegisterBody,
  ) => {
    try {
      await axiosInstance.post("/auth/register", values)
      setAlreadyRegistered(true)
    } catch (error) {
      toast.error(parseError(error).message)
    }
  }

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmedPassword: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchemaUser}
    >
      {({ submitForm, isSubmitting, values }) => (
        <>
          <Typography
            fontSize={28}
            fontWeight={700}
            color={({ palette }) => palette.primary.main}
          >
            GuruWalk
          </Typography>
          {alreadyRegistered ? (
            <Typography
              color={({ palette }) => palette.grey[800]}
              fontSize={18}
              fontWeight={700}
              mt={1}
              pb={2}
            >
              Hemos enviado un correo a{" "}
              <i>
                <u>{values.email}</u>
              </i>{" "}
              para asegurar que eres tú
            </Typography>
          ) : (
            <>
              <Typography
                color={({ palette }) => palette.grey[800]}
                fontSize={20}
                fontWeight={700}
                pb={2}
              >
                Únete a nuestra comunidad
              </Typography>
              <FormikTextField label="Nombre" name="name" required />
              <FormikTextField label="Email" name="email" required />
              <FormikTextField
                label="Teléfono"
                name="phone"
                type="stringInteger"
              />
              <FormikTextField
                label="Contraseña"
                type="password"
                name="password"
                required
              />
              <FormikTextField
                label="Confirmar contraseña"
                type="password"
                name="confirmedPassword"
                required
              />
              <Button
                disabled={isSubmitting}
                sx={{ mb: 5, mt: 3 }}
                fullWidth
                onClick={submitForm}
              >
                Registrarse
              </Button>
              <Typography>
                Ya tengo cuenta. <Link>Iniciar Sesión</Link>
              </Typography>
            </>
          )}
        </>
      )}
    </Formik>
  )
}

export default RegisterPage
