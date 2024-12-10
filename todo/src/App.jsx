import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import './App.css'
import RootLayout from './components/Root';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ErrorPage from './components/Error';
import PrivateRoute from './components/PrivateRoute ';

function App() {
  const router = createBrowserRouter([

    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
       /* { index: true, element: <Home /> },
        { path: '', element: <Navigate to="login" /> },*/
        { path: '', index: true, element: <Navigate to="login" /> },
        { path: 'login', element: <Login />,  },
        /*{ path: 'home', element: <Home /> },*/
        { path: 'home', element: <PrivateRoute ><Home /></PrivateRoute> },
        { path: 'register', element: <Register /> },
      ],
    }
  ]);

  return <RouterProvider router={router} />
}

export default App
