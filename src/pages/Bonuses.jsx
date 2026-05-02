import React, { useState } from 'react';
import { Gift, ChevronRight, ArrowLeft } from 'lucide-react';
import { bonuses } from '../data/bonuses';

export default function Bonuses() {
  const [selectedBonus, setSelectedBonus] = useState(null);

  if (selectedBonus) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSelectedBonus(null)}
          className="flex items-center gap-2 text-brand-green font-medium mb-6 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Voltar aos Bônus
        </button>
        
        <div className="bg-brand-green-light p-6 rounded-3xl mb-6 relative overflow-hidden">
          <Gift className="absolute -right-4 -bottom-4 w-32 h-32 text-brand-green opacity-10" />
          <h2 className="text-2xl font-bold text-brand-dark relative z-10">{selectedBonus.title}</h2>
          <p className="text-gray-600 mt-2 relative z-10 text-sm">{selectedBonus.description}</p>
        </div>

        <div className="card space-y-3">
          {selectedBonus.content.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
          <Gift className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-brand-dark">Seus Bônus</h2>
        <p className="text-gray-500 text-sm mt-1">Materiais exclusivos liberados para você</p>
      </div>

      <div className="grid gap-4">
        {bonuses.map((bonus) => (
          <div 
            key={bonus.id}
            onClick={() => setSelectedBonus(bonus)}
            className="card cursor-pointer group hover:border-purple-300 transition-colors border-2 border-transparent"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-brand-dark text-sm leading-tight mb-1">{bonus.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{bonus.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-purple-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
