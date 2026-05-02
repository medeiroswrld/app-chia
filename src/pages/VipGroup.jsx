import React from 'react';
import { Users, CheckCircle2, Lock } from 'lucide-react';

export default function VipGroup() {
  return (
    <div className="space-y-8 pb-6">
      <div className="text-center mt-4">
        <div className="w-24 h-24 bg-surface border border-border-subtle rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <Lock className="w-10 h-10 text-text-muted" />
        </div>
        <h2 className="text-3xl font-bold text-text-main mb-2">Grupo VIP</h2>
        <p className="text-text-muted text-sm px-4">
          Nossa comunidade exclusiva está passando por melhorias e estará disponível em breve.
        </p>
      </div>

      <button 
        disabled
        className="w-full bg-surface text-text-muted font-bold py-4 px-6 rounded-2xl shadow-sm flex items-center justify-center gap-3 cursor-not-allowed border border-border-subtle"
      >
        <Lock className="w-5 h-5" />
        Em Desenvolvimento
      </button>

      <div className="card bg-surface mt-8 opacity-60">
        <h3 className="font-bold text-text-main mb-4 text-lg">Regras do grupo</h3>
        <ul className="space-y-4">
          {[
            'Respeite as participantes.',
            'Não envie spam ou links de terceiros.',
            'Compartilhe dúvidas sobre o protocolo.',
            'Acompanhe os avisos fixados.',
            'Mantenha o foco nos 21 dias.'
          ].map((rule, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-border-subtle flex-shrink-0 mt-0.5" />
              <span className="text-sm text-text-muted leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="text-center pt-4">
        <p className="text-xs text-brand-accent font-medium">
          Aviso: O acesso será liberado automaticamente assim que a nova plataforma for finalizada.
        </p>
      </div>
    </div>
  );
}
