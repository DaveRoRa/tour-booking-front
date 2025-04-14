import { useParams } from "react-router-dom"
import { useGetTourRouteByIdQuery } from "../../../app/tour-routers-api-slice"
import TourRouteForm from "../../../components/form/tour-route.form"
import FullScreenLoader from "../../../components/full-screen-loader"
import ErrorComponent from "../../../components/error-component"

const EditTourPage = () => {
  const { id } = useParams()
  const { data, status, error } = useGetTourRouteByIdQuery(id || "")

  if (status === "pending") {
    return <FullScreenLoader />
  }

  if (status === "rejected") {
    return <ErrorComponent error={error} />
  }

  return <TourRouteForm data={data} />
}
export default EditTourPage
