import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, allowedRoles }) => {
    // 1. Get the token from local storage
    const token = localStorage.getItem('token');

    // 2. Check if a token exists
    if (!token) {
        return <Navigate to="/login" />;
    }
    try {
        const decoded = jwtDecode(token);
        const userRole = decoded.user.role;

        if (allowedRoles.includes(userRole)) {
            return children;
        } else {
            // Redirect to a dashboard based on the user's actual role
            if (userRole === 'client') {
                return <Navigate to="/client-dashboard" />;
            } else if (userRole === 'freelancer') {
                return <Navigate to="/freelancer-dashboard" />;
            }
        }
    } catch (err) {
        console.error('Invalid token', err);
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;