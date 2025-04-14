import { useNavigate, useParams } from "react-router-dom"
import { useGetTourRouteByIdQuery } from "../../../app/tour-routers-api-slice"
import FullScreenLoader from "../../../components/full-screen-loader"
import ErrorComponent from "../../../components/error-component"
import { Stack } from "@mui/system"
import {
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
  Divider,
} from "@mui/material"
import moment from "moment"
import type { FormikHelpers } from "formik"
import { Formik } from "formik"
import FormikTextField from "../../../components/form/text-input"
import * as yup from "yup"
import { yupIntegerRequired } from "../../../utils/validations"
import { searchWithSameCase } from "../../../utils/miriad"
import { dateTranslationsJsonMap } from "../../../utils/constants"
import axiosInstance, { parseError } from "../../../utils/requests"
import { toast } from "react-toastify"

type BookingBody = {
  adults_amount: string
  kids_amount: string
}

const validationSchema = yup.object().shape({
  adults_amount: yupIntegerRequired.min(1, "Mínimo 1"),
  kids_amount: yupIntegerRequired.min(0, "Mínimo 0"),
})

const BookingForm = () => {
  const { tour_route_id, date, time } = useParams()
  const { data, error, status } = useGetTourRouteByIdQuery(tour_route_id!)
  const theme = useTheme()
  const isUnderMd = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()

  const handleSubmit = async (
    values: BookingBody,
    helpers: FormikHelpers<BookingBody>,
  ) => {
    try {
      await axiosInstance.post(`/bookings/create`, {
        booking_time: time,
        booking_date: moment(date).format("YYYY/MM/DD"),
        tour_route_id,
        ...values,
      })
      toast.success("Reserva realizada")
      navigate(`/bookings/all`)
    } catch (error) {
      toast.error(parseError(error).message)
    }
  }

  if (status === "pending") {
    return <FullScreenLoader />
  }
  if (status === "rejected") {
    return <ErrorComponent error={error} />
  }

  return (
    <Container maxWidth="lg">
      <Stack gap={4} direction={isUnderMd ? "column" : "row"}>
        <Stack flex={1}>
          <Typography
            mt={1}
            fontSize={28}
            fontWeight={700}
            color={({ palette }) => palette.grey[800]}
          >
            Detalles de reserva
          </Typography>
          <Typography mt={1} fontSize={18}>
            ¿Cuántas personas van a ir?
          </Typography>
          <Formik
            initialValues={{ adults_amount: "1", kids_amount: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ submitForm }) => (
              <Stack gap={2}>
                <Stack gap={2} direction="row">
                  <FormikTextField
                    name="adults_amount"
                    label="Número de adultos"
                    min={1}
                    type="number"
                  />
                  <FormikTextField
                    name="kids_amount"
                    label="Número de niños (14 años o menos)"
                    min={0}
                    type="number"
                  />
                </Stack>
                <Button onClick={submitForm} variant="contained">
                  Continuar
                </Button>
              </Stack>
            )}
          </Formik>
        </Stack>
        <Stack
          borderRadius={1}
          width={isUnderMd ? "100%" : 350}
          sx={{ border: ({ palette }) => `1px solid ${palette.grey[300]}` }}
          p={3}
          gap={2}
        >
          <Typography
            fontWeight={700}
            fontSize={20}
            color={({ palette }) => palette.grey[800]}
          >
            {data?.title}
          </Typography>
          <Divider orientation="horizontal" flexItem />
          <Typography fontSize={16}>
            {searchWithSameCase(
              moment(date).format("dddd, DD [de] MMMM [de] YYYY"),
              dateTranslationsJsonMap,
            )}
            {", "}
            {time?.slice(0, 5)}
          </Typography>
          <Divider orientation="horizontal" flexItem />
          <Typography fontSize={16}>Idiomas: Español e Inglés</Typography>{" "}
          <Divider orientation="horizontal" flexItem />
          <Stack gap={1}>
            <Typography
              fontWeight={700}
              fontSize={18}
              color={({ palette }) => palette.grey[800]}
            >
              ¿Cuál es el precio?
            </Typography>
            <Typography>
              Un guruwalk es un tour de libre pago, es decir, es completamente
              gratis reservar, pero el guru espera ser recompensado al final con
              la cantidad que tú quieras. Algunos walkers dan 10€ por persona,
              otras dan 50‎ US$, tú eliges el precio. Por un tema de
              organización, es obligatorio reservar antes de asistir. Reservar
              es superfácil, rápido y totalmente gratis. ¡Reserva tu tour ahora!
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

const CreateBooking = () => {
  const { tour_route_id, date, time } = useParams()

  if (
    !tour_route_id ||
    isNaN(+tour_route_id) ||
    !date ||
    moment(date).format("YYYY-MM-DD") !== date ||
    !time ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)
  ) {
    return (
      <ErrorComponent
        error={{
          message:
            "Algunos de los parámetros de la dirección url no existen o son incorrectos",
        }}
      />
    )
  }
  return <BookingForm />
}

export default CreateBooking
