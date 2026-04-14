import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userStr = localStorage.getItem("user");
    const userRole = localStorage.getItem("role"); 

    if (!userStr && !userRole) {
        return <Navigate to="/login" replace />;
    }

    try {
        let role = userRole;
        if (userStr) {
            const user = JSON.parse(userStr);
            role = user.role;
        }

        if (!allowedRoles.includes(role)) {
            return <Navigate to="/dashboard" replace />;
        }
    } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
