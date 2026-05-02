import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarCheck, BookOpen, ShoppingCart, User } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { to: '/app', icon: Home, label: 'Início' },
    { to: '/protocolo', icon: CalendarCheck, label: 'Protocolo' },
    { to: '/receitas', icon: BookOpen, label: 'Receitas' },
    { to: '/compras', icon: ShoppingCart, label: 'Compras' },
    { to: '/progresso', icon: User, label: 'Progresso' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-surface/90 backdrop-blur-xl border-t border-border-subtle z-50 px-2 pb-safe shadow-[0_-10px_40px_rgb(0,0,0,0.03)]">
      <div className="h-full flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/app'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300 relative ${
                isActive ? 'text-brand-primary translate-y-[-2px]' : 'text-text-muted hover:text-text-main'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  className={`w-[22px] h-[22px] transition-all duration-300 ${isActive ? 'stroke-[2.5px] scale-110' : 'stroke-[2px]'}`} 
                />
                <span className={`text-[10px] transition-all duration-300 ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -top-3 w-1.5 h-1.5 bg-brand-primary rounded-full shadow-sm"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
