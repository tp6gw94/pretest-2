import { useAuth } from '../hooks/useAuth.ts';
import { Navigate, useLocation } from 'react-router-dom';
import { routerPaths } from '../app/routerPaths.ts';
import { setLocalStorage } from '../utils/localStorageUtils.ts';
import Spinners from './Spinners.tsx';

const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const { isLoggedIn, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return <Spinners fullpage />;
  }

  if (!isLoggedIn) {
    setLocalStorage('auth_from', location);
    return <Navigate to={routerPaths.login} replace />;
  }

  return children;
};

export default RequireAuth;
