import React from 'react';
import { Link } from 'react-router-dom';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">MyShop</Link>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/cart" className="hover:text-blue-500">Cart</Link></li>
            <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
            <li><Link to="/register" className="hover:text-blue-500">Register</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
