import { useRouteError } from "react-router-dom"
import ErrorComponent from "../components/error-component"

export default function ErrorPage() {
  const error = useRouteError() as any
  console.error(error)

  return <ErrorComponent error={error} allowUnknownStatus />
}
