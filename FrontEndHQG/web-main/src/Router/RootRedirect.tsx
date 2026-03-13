import { useAuth } from '../Hooks/AuthContext'
import { Navigate, useMatch } from '@tanstack/react-location'
import { LocationGenerics } from './CustomRouter'

export const RootRedirect = () => {
  const auth = useAuth()
  console.log("Running as overwrite")
  if (auth.status === "loggedIn" && auth.user && auth.user.id) {
    if (!auth.user?.roles) {
      auth.logout()
      return <Navigate to={`/login`} />
    }
    if (auth.user?.roles?.includes("professional")) {
      return <Navigate to={`/${auth.user?.id}/dashboard`} />
    } else {
      return <Navigate to={`/${auth.user?.id}/recordings`} />
    }
  } else {
    return <Navigate to={`/login`} />
  }
}
