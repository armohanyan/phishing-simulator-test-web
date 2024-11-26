import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PhishingSimulation from '../pages/PhishingSimulation';
import ProtectedRoute from "../middlewares/ProtectedAuthRoute";
import AuthProvider from "../providers/AuthProvider";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login/>,
  },
  {
    path: '/register',
    element: <Register/>,
  },
  {
    path: '/phishing-simulation',
    element: (
      <ProtectedRoute>
        <PhishingSimulation/>
      </ProtectedRoute>
    ),
  },
]);

export default function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={routes}/>
    </AuthProvider>
  );
}