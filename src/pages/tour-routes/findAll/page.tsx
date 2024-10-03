import { Button, Grid, Stack, Typography } from "@mui/material"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { useGetAllTourRoutesQuery } from "../../../app/tour-routers-api-slice"
import TourCard from "./tour-card"

const AllTourRoutesPage = () => {
  const { data } = useGetAllTourRoutesQuery(1)
  console.log("data :>> ", data)
  return (
    <Stack gap={8}>
      <Typography
        fontWeight={700}
        variant="h3"
        color={({ palette }) => palette.primary.main}
      >
        GuruWalk
      </Typography>
      <Typography variant="h4" color="ActiveBorder">
        Los mejores guías de free tours del mundo están aquí:
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          width: "100%",
          boxShadow: ({ shadows }) => shadows[5],
          px: 1.5,
          py: 2,
          cursor: "text",
          maxWidth: 720,
        }}
      >
        <Stack>
          <Typography>¿Dónde?</Typography>
          <Typography variant="h6">Busca Recorridos</Typography>
        </Stack>
        <Button
          sx={{
            "& .MuiButton-icon": {
              ml: "auto",
              mr: "auto",
            },
            p: 2,
            width: "fit-content",
            borderRadius: 1,
          }}
          startIcon={<SearchOutlinedIcon fontSize="large" />}
        />
      </Stack>
      <Stack>
        <Typography
          variant="h6"
          fontWeight={700}
          color={({ palette }) => palette.grey[800]}
        >
          Tour destacados
        </Typography>
        <Grid container mt={2}>
          <Grid item xs={3}>
            <TourCard
              title="Bodeguita del medio"
              duration={2}
              id={2}
              pictures="https://media.guruwalk.com/nb129gz3ed6o0f8erym3llilb9j3"
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  )
}

export default AllTourRoutesPage
