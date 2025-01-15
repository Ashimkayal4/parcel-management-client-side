
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoutes = ({ children }) => {
    const {loading, user} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;