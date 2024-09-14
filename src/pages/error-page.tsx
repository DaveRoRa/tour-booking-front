import { useNavigate, useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError() as any
  const navigate = useNavigate()
  console.error(error)

  return (
    <div>
      Oops. Sorry, an unexpected error has occurred.{" "}
      <button onClick={() => navigate(-1)}> Go back</button>
    </div>
  )
}
