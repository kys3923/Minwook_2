import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const useAuth = () => {
  const user = { loggedIn: true };
  return user && user.loggedIn;
}

const PrivateRoute = () => {

  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="login" />
}
export default PrivateRoute;