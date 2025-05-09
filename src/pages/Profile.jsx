import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">My Profile</h2>
      <div className="d-flex mb-4 gap-3">
        <NavLink to="orders" className="btn btn-outline-primary">Orders</NavLink>
        <NavLink to="favorites" className="btn btn-outline-primary">Favorites</NavLink>
        <NavLink to="settings" className="btn btn-outline-primary">Settings</NavLink>
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
