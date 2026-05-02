import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Play, CalendarCheck, BookOpen, ShoppingCart, Gift } from 'lucide-react';
import { authService } from '../services/authService';
import { progressService } from '../services/progressService';
import { recipes } from '../data/recipes';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const completedDays = progressService.getCompletedDaysCount();
  const currentDay = progressService.getCurrentDayNumber();

  const quickLinks = [
    { icon: CalendarCheck, label: 'Protocolo', path: '/protocolo', color: 'bg-blue-100 text-blue-600' },
    { icon: BookOpen, label: 'Receitas', path: '/receitas', color: 'bg-green-100 text-green-600' },
    { icon: ShoppingCart, label: 'Lista', path: '/compras', color: 'bg-orange-100 text-orange-600' },
    { icon: Gift, label: 'Bônus', path: '/bonus', color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-text-main tracking-tight">
          Bem-vinda, <span className="text-brand-primary">{user?.email?.split('@')[0] || 'Linda'}</span>!
        </h2>
        <p className="text-text-muted text-sm mt-1">Pronta para continuar seu protocolo hoje?</p>
      </div>

      {/* Main Action Card */}
      <div className="bg-brand-primary rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            Dia {currentDay} de 21
          </span>
          <h3 className="text-2xl font-bold mt-4 mb-2">Continue seu Protocolo</h3>
          <p className="text-white/80 text-sm mb-6 max-w-[80%]">
            Marque suas tarefas de hoje e acompanhe sua evolução diária.
          </p>
          <button 
            onClick={() => navigate('/protocolo')}
            className="bg-white text-brand-primary px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-opacity-90 transition-colors"
          >
            <Play className="w-4 h-4 fill-current" /> Ver dia de hoje
          </button>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card text-center py-5">
          <div className="text-3xl font-bold text-text-main mb-1">{completedDays}</div>
          <div className="text-xs text-text-muted font-medium uppercase tracking-wide">Dias Concluídos</div>
        </div>
        <div className="card text-center py-5">
          <div className="text-3xl font-bold text-text-main mb-1">{recipes.length}</div>
          <div className="text-xs text-text-muted font-medium uppercase tracking-wide">Receitas Inclusas</div>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-bold text-text-main mb-3">Acesso Rápido</h3>
        <div className="grid grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.path)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${link.color} shadow-sm group-hover:scale-105 transition-transform`}>
                <link.icon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-text-muted">{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Oferta */}
      <div className="card">
        <h3 className="font-bold text-text-main mb-4">Sua Oferta Inclui</h3>
        <ul className="space-y-3">
          {[
            'Receitas para secar',
            'Receitas deliciosas e práticas',
            'Protocolo de 21 dias passo a passo',
            'Lista completa dos ingredientes',
            'Acesso vitalício ao Grupo VIP'
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm text-text-main">
              <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* VIP CTA */}
      <div 
        onClick={() => navigate('/vip')}
        className="card border-2 border-border-subtle cursor-pointer hover:border-brand-primary/50 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="bg-brand-primary-light p-3 rounded-full">
            <Gift className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <h4 className="font-bold text-text-main text-sm">Grupo VIP</h4>
            <p className="text-xs text-brand-accent mt-0.5">Em desenvolvimento</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-text-muted" />
      </div>

    </div>
  );
}
