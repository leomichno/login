import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
export default function ProtectedRoute(){

    const auth = useAuth()

    // valida si isAuth es veerdadero muestro lo que esta en Outlet si no nos manda a Navigate
    return auth.isAuthenticated ? <Outlet/> : <Navigate to="/"/>
}