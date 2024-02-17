import React from 'react'
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { authSelector } from "../../store/reducers/authSlice";

const PrivateRoutes = () => {

    const { userAuthenticated } = useSelector(authSelector)

    return(
        userAuthenticated ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes