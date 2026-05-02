import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { protocolDays } from '../data/protocolDays';
import { progressService } from '../services/progressService';
import { recipes } from '../data/recipes';

export default function Protocol() {
  const [progress, setProgress] = useState({});
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    setProgress(progressService.getProtocolProgress());
    setExpandedDay(progressService.getCurrentDayNumber());
  }, []);

  const handleCheck = (dayId, checkKey) => {
    const dayProgress = progress[dayId] || { checks: {} };
    const newChecks = { ...dayProgress.checks, [checkKey]: !dayProgress.checks[checkKey] };
    
    // Check if all 4 tasks are completed to mark the day as completed
    const isCompleted = newChecks['tomei'] && newChecks['agua'] && newChecks['acucar'] && newChecks['progresso'];
    
    const newData = { checks: newChecks, completed: isCompleted };
    progressService.saveDayProgress(dayId, newData);
    
    setProgress({ ...progress, [dayId]: { ...dayProgress, ...newData } });
  };

  const completedCount = Object.values(progress).filter(d => d.completed).length;
  const progressPercent = Math.round((completedCount / 21) * 100);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-main">Protocolo 21 Dias</h2>
        <p className="text-text-muted text-sm mt-1">Sua jornada de transformação</p>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex justify-between items-end mb-2">
          <span className="font-semibold text-text-main text-sm">Seu Progresso</span>
          <span className="text-brand-primary font-bold text-sm">{completedCount} de 21 dias</span>
        </div>
        <div className="w-full bg-border-subtle rounded-full h-3 overflow-hidden">
          <div 
            className="bg-brand-primary h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-3">
        {protocolDays.map((dayData) => {
          const isExpanded = expandedDay === dayData.day;
          const dayProgress = progress[dayData.day] || { checks: {}, completed: false };
          const isCompleted = dayProgress.completed;
          const recipe = recipes.find(r => r.id === dayData.recipeId);

          return (
            <div 
              key={dayData.day} 
              className={`bg-surface rounded-2xl border transition-colors overflow-hidden ${
                isCompleted ? 'border-brand-primary/30' : 'border-border-subtle'
              }`}
            >
              {/* Card Header (Clickable) */}
              <button 
                onClick={() => setExpandedDay(isExpanded ? null : dayData.day)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    isCompleted ? 'bg-brand-primary text-white' : 'bg-brand-primary-light text-brand-primary'
                  }`}>
                    {dayData.day}
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main">Dia {dayData.day}</h3>
                    <p className="text-xs text-text-muted">{dayData.focus}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isCompleted && <CheckCircle2 className="w-5 h-5 text-brand-primary" />}
                  {isExpanded ? 
                    <ChevronUp className="w-5 h-5 text-text-muted" /> : 
                    <ChevronDown className="w-5 h-5 text-text-muted" />
                  }
                </div>
              </button>

              {/* Card Body (Expanded state) */}
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-border-subtle mt-2">
                  <div className="bg-background rounded-xl p-3 mb-4 mt-2">
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Dica do dia</span>
                    <p className="text-sm text-text-main mt-1 italic">"{dayData.tip}"</p>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-semibold text-text-muted uppercase">Receita Indicada</span>
                    <p className="text-brand-primary font-medium text-sm mt-1">{recipe?.title}</p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-text-muted uppercase">Seu Checklist</span>
                    
                    {[
                      { key: 'tomei', label: 'Tomei minha receita com chia' },
                      { key: 'agua', label: 'Bebi água suficiente hoje' },
                      { key: 'acucar', label: 'Evitei doces/açúcar' },
                      { key: 'progresso', label: 'Refleti sobre meu progresso' },
                    ].map((checkItem) => {
                      const isChecked = dayProgress.checks[checkItem.key];
                      return (
                        <button
                          key={checkItem.key}
                          onClick={() => handleCheck(dayData.day, checkItem.key)}
                          className="w-full flex items-center gap-3 text-left group"
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-6 h-6 text-brand-accent flex-shrink-0" />
                          ) : (
                            <Circle className="w-6 h-6 text-border-subtle group-hover:text-brand-accent transition-colors flex-shrink-0" />
                          )}
                          <span className={`text-sm ${isChecked ? 'text-text-muted line-through' : 'text-text-main'}`}>
                            {checkItem.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
