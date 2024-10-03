import { useNavigate, useParams } from "react-router-dom"
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded"
import { useGetTourRouteByIdQuery } from "../../../app/tour-routers-api-slice"
import TourRouteForm from "../../../components/form/tour-route.form"
import {
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { parseError } from "../../../utils/requests"

const EditTourPage = () => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down("sm"))
  const { id } = useParams()
  const { data, status, error } = useGetTourRouteByIdQuery(id || "")
  const navigate = useNavigate()
  const wideScreenHeight = `calc(100vh - ${isXs ? 32 : 96}px)`
  if (status === "pending") {
    return (
      <Stack
        width="100%"
        height={wideScreenHeight}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress sx={{ borderRadius: 99 }} size={isXs ? 50 : 100} />
      </Stack>
    )
  }

  if (status === "rejected") {
    return (
      <Stack
        height={wideScreenHeight}
        alignItems="center"
        justifyContent="center"
      >
        <WarningAmberRoundedIcon
          sx={{ fontSize: 120, color: ({ palette }) => palette.error.light }}
        />
        <Typography variant="h3">Error</Typography>
        <Typography variant="h4">{parseError(error).message}</Typography>
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ReplyRoundedIcon />}
          sx={{ mt: 2, fontSize: 16 }}
        >
          Atrás
        </Button>
      </Stack>
    )
  }

  return <TourRouteForm data={data} />
}
export default EditTourPage
