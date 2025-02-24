import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const location = useLocation();

    
    const token = localStorage.getItem("token");
    return token ? children : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
