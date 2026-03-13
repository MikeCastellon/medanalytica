import { Navigate, useLocation, useRouter } from "@tanstack/react-location"


export const RedirectToRecording = () => {
    const location = useLocation()
    return (
        <Navigate to={`${location.current.pathname}/r`} />
    )
}