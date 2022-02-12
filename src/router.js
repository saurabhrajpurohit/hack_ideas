import { Navigate, useRoutes } from 'react-router-dom';

import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import HomeLayout from './layouts/HomeLayout';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NotFound from './pages/Page404';

export default function Router() {
  return useRoutes([
    {
      path: '/home',
      element: <HomeLayout />,
      children: [
        { element: <Navigate to="/home/hacks" replace /> },
        { path: 'hacks', element: <Home /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <SignUp /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
