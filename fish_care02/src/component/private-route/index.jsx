import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");  
        } 
    }, [navigate]);

    return <Outlet />; 
};

export default PrivateRoute;