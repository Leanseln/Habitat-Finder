import { Outlet, Navigate } from "react-router-dom";
import { UseAuthStatus } from "../hooks/UseAuthStatus";
import Loading from "./Loading";

export default function PrivateRoute() {
    const { loggedIn, checkingStatus } = UseAuthStatus();
    if (checkingStatus) {
        return <Loading />
    }
    return loggedIn ? <Outlet /> : <Navigate to="/landingpage" />;
}