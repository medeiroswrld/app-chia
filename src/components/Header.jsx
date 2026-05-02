import React from 'react';
import { Settings as SettingsIcon, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface shadow-sm z-50 px-4 flex items-center justify-between border-b border-border-subtle transition-colors duration-300">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/app')}
      >
        <div className="bg-brand-primary-light p-2 rounded-full">
          <Leaf className="w-5 h-5 text-brand-primary" />
        </div>
        <h1 className="text-xl font-bold text-text-main tracking-tight">Chia Seca</h1>
      </div>
      
      <button 
        onClick={() => navigate('/configuracoes')}
        className="p-2 text-text-muted hover:text-brand-primary transition-colors rounded-full hover:bg-brand-primary-light"
        aria-label="Configurações"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>
    </header>
  );
}
