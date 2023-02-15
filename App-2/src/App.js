
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import UserForm, { action as addUpdateUserAction } from "./Components/UserForm";
import EditUserPage from "./pages/EditUser";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import NewUserPage from "./pages/NewUser";
import ProductDetailPage from "./pages/ProductDetail";
//import ProductsPage from "./pages/Products";
import RootLayout from './pages/Root';
import UserDetailPage, { loader as userDetailLoader, action as deleteUserAction } from "./pages/UserDetail";
//import Users, { loader as usersLoader } from "./pages/Users";
import UsersRootLayout from "./pages/UsersRoot";
import AuthenticationPage, { action as authAction } from './pages/Authentication';
import { Suspense, lazy } from "react";

const ProductsPage = lazy(() => import("./pages/Products"));
const Users = lazy(() => import("./pages/Users"));
/*const routeDefs = createRoutesFromElements(
  <Route>
    <Route path="/"  element=<HomePage /> />,
    <Route path="/products"  element=<Products /> />
  </Route>
)
const router = createBrowserRouter(routeDefs);*/

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, //default route
      {
        path: 'products', element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsPage />
          </Suspense>
        ),
      },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      {
        path: 'users', element: <UsersRootLayout />,
        children: [
          {
            index: true, element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Users />
              </Suspense>
            ), loader: () =>
              import('./pages/Users').then((module) => module.loader()),
          },
          {
            path: ':userId', id: 'user-detail', loader: userDetailLoader,
            children: [
              { index: true, element: <UserDetailPage />, action: deleteUserAction },
              { path: 'edit', element: <EditUserPage />, action: addUpdateUserAction },
            ],
          },
          { path: 'new', element: <NewUserPage />, action: addUpdateUserAction },
        ]
      },
      { path: 'newsletter', element: <NewsletterPage />, action: newsletterAction },
      { path: 'auth', element: <AuthenticationPage />, action: authAction },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
