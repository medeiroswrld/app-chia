import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { authService } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, insira seu e-mail.');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    authService.login(email);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-3xl shadow-xl overflow-hidden border border-border-subtle">
        
        <div className="bg-brand-primary p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Leaf className="w-32 h-32 -mr-8 -mt-8" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-surface p-4 rounded-full mb-4 shadow-md">
              <Leaf className="w-10 h-10 text-brand-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Chia Seca</h1>
            <p className="text-white/90 font-medium">Protocolo 21 Dias</p>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-text-main">Acesse seu Protocolo</h2>
            <p className="text-text-muted text-sm mt-2">
              Acesso vitalício ao protocolo, receitas e bônus.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-main mb-2">
                Seu e-mail de acesso
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={`w-full px-4 py-3 rounded-xl border ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-border-subtle focus:ring-brand-primary'
                } focus:outline-none focus:ring-2 transition-shadow bg-background text-text-main`}
                placeholder="exemplo@email.com"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button type="submit" className="btn-primary flex items-center justify-center gap-2">
              Entrar no App
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-text-muted">
              Uso exclusivo para alunas do método Chia Seca.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
