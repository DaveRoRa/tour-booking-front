import { Stack } from "@mui/material"
import { useGetAllTourRoutesQuery } from "../../../app/tour-routers-api-slice"

const AllTourRoutesPage = () => {
  const {} = useGetAllTourRoutesQuery(1)
  return <Stack>All routes</Stack>
}

export default AllTourRoutesPage
