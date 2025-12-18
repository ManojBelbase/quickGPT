import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import type { JSX } from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser();

    // Wait for Clerk to load
    if (!isLoaded) return null;

    if (!isSignedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
