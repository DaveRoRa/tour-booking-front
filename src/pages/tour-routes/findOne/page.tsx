import {
  alpha,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import { Editor } from "@tiptap/react"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded"
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined"
import ImageBox from "../../../components/image-box"
import BookingCalendar from "./booking-calendar"
import { useParams } from "react-router-dom"
import { useGetTourRouteByIdQuery } from "../../../app/tour-routers-api-slice"
import ErrorComponent from "../../../components/error-component"
import FullScreenLoader from "../../../components/full-screen-loader"
import { convertMinutesToHours } from "../../../utils/miriad"
import EnrichedTextReadOnly, {
  tipTapExtensions,
} from "../../../components/form/enriched-text-readonly"
import ScrollableContainer from "../../../components/scrollable-container"

const OneTourRoutePage = () => {
  const { id } = useParams()
  const { data, status, error } = useGetTourRouteByIdQuery(id!)
  
  if (status === "pending") {
    return <FullScreenLoader />
  }
  if (status === "rejected") {
    return <ErrorComponent error={error} />
  }

  const { hours, minutes } = convertMinutesToHours(data!.duration)
  const tiptapDescription = new Editor({
    content: data!.description,
    extensions: tipTapExtensions,
  })

  return (
    <Stack>
      <ScrollableContainer>
        {({ checkScroll }) => (
          <Stack direction="row" gap={2}>
            {data?.pictures.map(({ original_filename, url }) => (
              <ImageBox
                key={url}
                alt={original_filename}
                src={url}
                height={350}
                sx={{
                  px: 1,
                }}
                finishLoading={checkScroll}
              />
            ))}
          </Stack>
        )}
      </ScrollableContainer>
      <Container maxWidth="xl" sx={{ px: 2, position: "relative", top: -48 }}>
        <Stack direction="row" gap={3}>
          <Card sx={{ p: 4, borderRadius: 4 }}>
            <Typography
              variant="subtitle1"
              component="span"
              py={0.5}
              borderRadius={1}
              px={1}
              color={({ palette }) => palette.grey[600]}
              sx={{ backgroundColor: ({ palette }) => palette.grey[100] }}
            >
              Free tour
            </Typography>
            <Typography
              mt={1}
              fontSize={28}
              fontWeight={700}
              color={({ palette }) => palette.grey[800]}
            >
              {data?.title}
            </Typography>
            <Stack mt={4} direction="row" gap={2} flexWrap="wrap">
              <Typography display="flex" alignItems="center" fontSize={16}>
                <AccessTimeRoundedIcon sx={{ fontSize: 18, mr: 0.5 }} />{" "}
                <b>Duración</b>:{" "}
                {hours === 0 ? "" : hours === 1 ? "1 hora" : `${hours} horas`}
                {!!hours && !!minutes ? " y " : ""}
                {minutes === 0
                  ? ""
                  : minutes === 1
                    ? "1 minuto"
                    : `${minutes} minutos`}
              </Typography>
              <Typography display="flex" alignItems="center" fontSize={16}>
                <LanguageRoundedIcon sx={{ fontSize: 18, mr: 0.5 }} />{" "}
                <b>Idiomas</b>: Español e Inglés
              </Typography>
            </Stack>
            <Stack direction="row" mt={4}>
              <Stack>
                <Stack
                  mr={2}
                  borderRadius={99}
                  sx={{
                    backgroundColor: ({ palette }) =>
                      alpha(palette.secondary.light, 0.15),
                  }}
                  color={({ palette }) => palette.grey[800]}
                  p={0.8}
                >
                  <BusinessCenterOutlinedIcon fontSize="small" />
                </Stack>
              </Stack>
              <Stack>
                <Typography
                  fontSize={20}
                  fontWeight={700}
                  color={({ palette }) => palette.secondary.main}
                >
                  Reserva y cancelación gratuitas
                </Typography>
                <Typography fontSize={14}>
                  Tour de libre pago, sin precio establecido, la reserva y
                  cancelación son gratuitas
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ my: 6 }} flexItem />
            {!!tiptapDescription.getText() && (
              <>
                <Typography
                  mt={1}
                  mb={2}
                  fontSize={24}
                  fontWeight={700}
                  color={({ palette }) => palette.grey[800]}
                >
                  Descripción del tour
                </Typography>
                <EnrichedTextReadOnly content={data!.description} />
                <Divider sx={{ my: 6 }} flexItem />
              </>
            )}
            <Typography
              mt={1}
              mb={2}
              fontSize={24}
              fontWeight={700}
              color={({ palette }) => palette.grey[800]}
            >
              ¿Cuánto cuesta este tour?
            </Typography>
            <Typography fontSize={16}>
              Los free tours no tienen un precio establecido, en su lugar, cada
              persona entrega al guru al finalizar el importe que considere
              oportuno (suelen ser cantidades comprendidas entre los x€ hasta
              los xx$ en función de la satisfacción con el tour).
            </Typography>
          </Card>

          <BookingCalendar availableTimes={data!.available_times} />
        </Stack>
      </Container>
    </Stack>
  )
}

export default OneTourRoutePage
