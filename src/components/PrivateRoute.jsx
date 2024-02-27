import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Loading from "./Loading";

export default function PrivateRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus();
    if (checkingStatus) {
        return <Loading />
    }
    return loggedIn ? <Outlet /> : <Navigate to="/landingpage" />;
}