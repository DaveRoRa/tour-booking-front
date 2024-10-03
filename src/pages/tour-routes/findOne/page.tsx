import { Stack } from "@mui/material"
import { useGetTourRouteByIdQuery } from "../../../app/tour-routers-api-slice"
import { useParams } from "react-router-dom"

const OneTourRoutePage = () => {
  const { id } = useParams()
  const { data, status } = useGetTourRouteByIdQuery(id!)
  if (status === "pending") {
    return "Loading..."
  }
  if (status === "rejected") {
    return "Error..."
  }

  return <Stack>{JSON.stringify(data)}</Stack>
}

export default OneTourRoutePage
