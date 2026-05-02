import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Palette, Moon, Sparkles, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const themes = [
    { id: 'default', label: 'Padrão (Verde)', icon: Palette, colorClass: 'text-green-500', bgClass: 'bg-green-50' },
    { id: 'dark', label: 'Modo Escuro', icon: Moon, colorClass: 'text-slate-700', bgClass: 'bg-slate-100' },
    { id: 'pink', label: 'Modo Rosa', icon: Sparkles, colorClass: 'text-pink-500', bgClass: 'bg-pink-50' },
  ];

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-2xl font-bold text-text-main tracking-tight mb-2">Configurações</h2>
        <p className="text-text-muted text-sm">Personalize a aparência do seu aplicativo.</p>
      </div>

      <div className="card">
        <h3 className="font-bold text-text-main mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-brand-primary" />
          Aparência
        </h3>
        
        <div className="space-y-3">
          {themes.map((t) => {
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => toggleTheme(t.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                  isActive 
                    ? 'border-brand-primary bg-brand-primary-light' 
                    : 'border-border-subtle bg-surface hover:border-brand-primary/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${t.bgClass}`}>
                    <t.icon className={`w-5 h-5 ${t.colorClass}`} />
                  </div>
                  <span className={`font-medium ${isActive ? 'text-brand-primary' : 'text-text-main'}`}>
                    {t.label}
                  </span>
                </div>
                {isActive && (
                  <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h3 className="font-bold text-text-main mb-4">Sessão</h3>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-red-100 bg-red-50 hover:bg-red-100 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-surface group-hover:scale-110 transition-transform">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <span className="font-medium text-red-600">Sair da Conta</span>
          </div>
        </button>
      </div>
    </div>
  );
}
