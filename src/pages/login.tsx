import { useAuth } from '../hooks/useAuth.ts';
import Spinners from '../components/Spinners.tsx';
import { Navigate } from 'react-router-dom';
import { routerPaths } from '../app/routerPaths.ts';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  const { login, isLoggedIn, ready } = useAuth();

  if (!ready) {
    return <Spinners fullpage />;
  }
  if (isLoggedIn) {
    return <Navigate to={routerPaths.home} />;
  }
  return <div className="d-flex vh-100 vw-100 justify-content-center align-items-center">
    <Helmet>
      <title>Login</title>
    </Helmet>
    <button className="btn btn-outline-primary" onClick={login}>Line LIFF Login</button>
  </div>;
};

export default LoginPage;
