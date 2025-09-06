// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>; // optional: show spinner
    }

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return children;
}
