import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Register from './pages/Register/Register';
import Home from './pages/Home';
import Root from './pages/Root';
import PrivateRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <PrivateRoute component={Home} />,
    children: [
      { path: 'home', element: <PrivateRoute component={Home} /> },
      { path: 'login', element: <Auth /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
