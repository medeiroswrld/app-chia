import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import { authService } from '../services/authService';

export default function Layout() {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-20 px-4">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
