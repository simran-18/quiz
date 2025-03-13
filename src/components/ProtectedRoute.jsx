import React, { useContext } from "react";
import {Navigate} from "react-router-dom";
import AppContext from "../contexts/AppContext";

const ProtectedRoute=({children,...rest})=>
{
    const {isLoggedIn}=useContext(AppContext);
    return isLoggedIn ? <>{children}</> : <Navigate to="/" />
}
export default ProtectedRoute;