import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded"
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { parseError } from "../utils/requests"

const ErrorComponent = ({
  error,
  allowUnknownStatus,
}: {
  error: any
  allowUnknownStatus?: boolean
}) => {
  const { message, status } = parseError(error, { allowUnknownStatus })
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down("sm"))
  const navigate = useNavigate()
  const wideScreenHeight = `calc(100vh - ${isXs ? 32 : 96}px)`

  return (
    <Stack
      height={wideScreenHeight}
      alignItems="center"
      justifyContent="center"
    >
      <WarningAmberRoundedIcon
        sx={{ fontSize: 120, color: ({ palette }) => palette.error.light }}
      />
      <Typography variant="h3">Error {status ? status : ""}</Typography>
      <Typography variant="h4">{message}</Typography>
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

export default ErrorComponent
