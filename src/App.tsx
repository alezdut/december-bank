import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Register from './pages/Register/Register';
import Home from './pages/Home';
import Root from './pages/Root';
import PrivateRoute from './components/ProtectedRoute';
import Transfer from './pages/transfer/Transfer';
import { ROUTES } from './constants/constants';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Root />,
    errorElement: <PrivateRoute component={Home} />,
    children: [
      { path: ROUTES.HOME, element: <PrivateRoute component={Home} /> },
      { path: ROUTES.TRANSFER, element: <PrivateRoute component={Transfer} /> },
      { path: ROUTES.LOGIN, element: <Auth /> },
      { path: ROUTES.REGISTER, element: <Register /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
