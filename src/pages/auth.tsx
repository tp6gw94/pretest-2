import { getLocalStorage, removeLocalStorage } from '../utils/localStorageUtils.ts';
import { Navigate, useLocation } from 'react-router-dom';
import { routerPaths } from '../app/routerPaths.ts';
import { useAuth } from '../hooks/useAuth.ts';
import Spinners from '../components/Spinners.tsx';

const AuthPage = () => {
  const { isLoggedIn, ready } = useAuth();
  const { pathname: authPagePath } = useLocation();
  const { pathname = '/' } = getLocalStorage('auth_from') ?? {};

  if (isLoggedIn) {
    removeLocalStorage('auth_from');
  }

  if (!ready) {
    return <Spinners fullpage />;
  }

  if (!isLoggedIn) {
    return <Navigate to={routerPaths.login} replace />;
  }

  if (pathname === authPagePath) {
    return <Navigate to={routerPaths.home} replace />;
  }

  return <Navigate to={pathname} replace />;
};

export default AuthPage;
