import { Navigate } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
