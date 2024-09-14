import { Button, Stack } from "@mui/material"
import type { FormikHelpers } from "formik"
import { Formik } from "formik"
import FormikTextField from "../../components/form/text-input"
import FormikCheckBox from "../../components/form/checkbox-input"
import { parseError } from "../../utils/requests"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../app/hooks"
import { loginUser } from "../../app/user-slice"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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
      navigate("/")
    }
  }

  return (
    <Stack>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <>
            <FormikTextField label="Email" type="email" name="email" required />
            <FormikTextField
              label="Paswword"
              type="password"
              name="password"
              required
            />
            <FormikCheckBox label="Remember Me" name="rememberMe" />
            <Button onClick={submitForm}>Login</Button>
          </>
        )}
      </Formik>
    </Stack>
  )
}

export default LoginPage
