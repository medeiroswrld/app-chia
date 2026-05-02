import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Protocol from './pages/Protocol';
import Recipes from './pages/Recipes';
import ShoppingList from './pages/ShoppingList';
import Bonuses from './pages/Bonuses';
import VipGroup from './pages/VipGroup';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import { authService } from './services/authService';
import { ThemeProvider } from './contexts/ThemeContext';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Auth Route Wrapper (redirects to app if already logged in)
const AuthRoute = ({ children }) => {
  if (authService.isAuthenticated()) {
    return <Navigate to="/app" replace />;
  }
  return children;
};

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/login" 
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            } 
          />
          
          {/* Protected App Routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/app" element={<Dashboard />} />
            <Route path="/protocolo" element={<Protocol />} />
            <Route path="/receitas" element={<Recipes />} />
            <Route path="/compras" element={<ShoppingList />} />
            <Route path="/bonus" element={<Bonuses />} />
            <Route path="/vip" element={<VipGroup />} />
            <Route path="/progresso" element={<Progress />} />
            <Route path="/configuracoes" element={<Settings />} />
          </Route>
          
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/app" replace />} />
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
