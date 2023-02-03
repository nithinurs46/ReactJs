import React from 'react';
import NavBarComponent from './Navbar';
import { Outlet } from 'react-router';
import SideBar from './Sidebar';

export default () => {
  return (
    <>
      <NavBarComponent />
      <div className="container" style={{ marginTop: '60px' }}>
      <Outlet />
      </div>
    </>
  );
};