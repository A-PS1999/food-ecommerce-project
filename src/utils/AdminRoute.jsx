import { useContext } from 'react';
import { AuthContext } from './AuthContextProvider';
import { Navigate, useLocation } from 'react-router-dom';

export default function AdminRoute({ children }) {

    const { userData } = useContext(AuthContext);
    const location = useLocation();

    if ((!userData) || (userData && userData.is_admin === false)) {
        return <Navigate to="/log-in" state={{ from: location }} replace /> 
    }

    return children;
}