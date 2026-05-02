import React from 'react';
import { LogOut, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="bg-brand-green-light p-2 rounded-full">
          <Leaf className="w-5 h-5 text-brand-green" />
        </div>
        <h1 className="text-xl font-bold text-brand-dark tracking-tight">Chia Seca</h1>
      </div>
      
      <button 
        onClick={handleLogout}
        className="p-2 text-gray-400 hover:text-brand-orange transition-colors rounded-full hover:bg-orange-50"
        aria-label="Sair"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </header>
  );
}
