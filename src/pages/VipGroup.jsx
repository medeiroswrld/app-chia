import React from 'react';
import { Users, CheckCircle2, Lock } from 'lucide-react';

export default function VipGroup() {
  return (
    <div className="space-y-8 pb-6">
      <div className="text-center mt-4">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <Lock className="w-10 h-10 text-gray-500" />
        </div>
        <h2 className="text-3xl font-bold text-brand-dark mb-2">Grupo VIP</h2>
        <p className="text-gray-500 text-sm px-4">
          Nossa comunidade exclusiva está passando por melhorias e estará disponível em breve.
        </p>
      </div>

      <button 
        disabled
        className="w-full bg-gray-200 text-gray-500 font-bold py-4 px-6 rounded-2xl shadow-sm flex items-center justify-center gap-3 cursor-not-allowed border border-gray-300"
      >
        <Lock className="w-5 h-5" />
        Em Desenvolvimento
      </button>

      <div className="card bg-white mt-8 opacity-60">
        <h3 className="font-bold text-brand-dark mb-4 text-lg">Regras do grupo</h3>
        <ul className="space-y-4">
          {[
            'Respeite as participantes.',
            'Não envie spam ou links de terceiros.',
            'Compartilhe dúvidas sobre o protocolo.',
            'Acompanhe os avisos fixados.',
            'Mantenha o foco nos 21 dias.'
          ].map((rule, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-500 leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="text-center pt-4">
        <p className="text-xs text-brand-orange font-medium">
          Aviso: O acesso será liberado automaticamente assim que a nova plataforma for finalizada.
        </p>
      </div>
    </div>
  );
}
