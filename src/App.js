import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense } from "react";
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginComponent from './Components/Auth/Login';
import BeforeLogin from './Components/Layout/BeforeLogin';
import AuthContext from './context/auth-context';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const AfterLogin = React.lazy(() => import("./Components/Layout/AfterLogin"));
const Dashboard = React.lazy(() => import("./Components/Dashboard/Dashboard"));
const SignUpComponent = React.lazy(() => import("./Components/Auth/Signup"));
const Movies = React.lazy(() => import("./Components/Movies/ImdbMovies"));
const TableData = React.lazy(() => import("./Components/Movies/TableData"));
const AllTasks = React.lazy(() => import("./Components/Tasks/AllTasks"));
const TaskAdd = React.lazy(() => import("./Components/Tasks/TaskAdd"));
const TaskDetail = React.lazy(() => import("./Components/Tasks/TaskDetail"));
const Comments = React.lazy(() => import('./Components/Comments/Comments'));
const LoadCustomerSatellites = React.lazy(() => import ('./Components/isro/LoadCustomerSatellites'));
const LoadCentres = React.lazy(() => import ('./Components/isro/LoadCentres'));
const StarWarsMovies = React.lazy(() => import ('./Components/Movies/StarWarsMovies'));


function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Suspense fallback={<Spinner animation="grow" variant="primary" />}>
      <Routes>
        <Route element={<BeforeLogin />}>
          <Route path='/' exact element={<Navigate replace to='/login' />} />
          <Route path='/login' exact element={<LoginComponent />} />
          <Route path='/signup' exact element={<SignUpComponent />} />
          <Route path='/signout' exact element={<LoginComponent />} />
          {<Route path='*' element={<Navigate replace to='/' />} />}
        </Route>
        {isLoggedIn && <Route element={<AfterLogin />}>
          <Route path='/' exact element={<Navigate replace to='/login' />} />
          <Route path='*' element={<Navigate replace to='/' />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/movies' exact element={<Movies />} />
          <Route path='star-wars' exact element={<StarWarsMovies />} />
          <Route path='/table' exact element={<TableData />} />
          <Route path='/tasks' exact element={<AllTasks />} />
          <Route path='/tasks/:id' exact element={<TaskDetail />} >
            <Route
              path=''
              element={
                <div className='centered'>
                  <Link className='btn--flat' to={`comments`}>
                    Load Comments
                  </Link>
                </div>
              }
            />
            <Route path={`comments`} element={<Comments />} />
          </Route>
          <Route path='/addTask' exact element={<TaskAdd />} />
          <Route path='/isro/customer-satellites' exact element={<LoadCustomerSatellites />} />
          <Route path='/isro/centres' exact element={<LoadCentres />} />
        </Route>
        }
      </Routes>
    </Suspense>
  );
}

export default App;
