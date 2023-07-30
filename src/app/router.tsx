import { createBrowserRouter } from 'react-router-dom';
import { routerPaths } from './routerPaths.ts';
import HomePage from '../pages/home.tsx';
import MapPage from '../pages/map.tsx';
import LoginPage from '../pages/login.tsx';
import NoMatch from '../pages/no-match.tsx';
import AuthPage from '../pages/auth.tsx';
import RequireAuth from '../components/RequireAuth.tsx';
import ErrorPage from '../pages/error-page.tsx';

export const router = createBrowserRouter([
  {
    path: routerPaths.home,
    element: <RequireAuth><HomePage /></RequireAuth>,
    errorElement: <ErrorPage />
  },
  {
    path: routerPaths.map,
    element: <RequireAuth><MapPage /></RequireAuth>,
    errorElement: <ErrorPage />
  },
  {
    path: routerPaths.login,
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: routerPaths.auth,
    element: <AuthPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: <NoMatch />,
    errorElement: <ErrorPage />
  }
]);
