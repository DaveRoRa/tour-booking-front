import { CircularProgress, Stack, useMediaQuery, useTheme } from "@mui/material"

const FullScreenLoader = () => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down("sm"))
  const wideScreenHeight = `calc(100vh - ${isXs ? 32 : 96}px)`
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

export default FullScreenLoader
