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
        <h2 className="text-2xl font-bold text-brand-dark">Protocolo 21 Dias</h2>
        <p className="text-gray-500 text-sm mt-1">Sua jornada de transformação</p>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex justify-between items-end mb-2">
          <span className="font-semibold text-brand-dark text-sm">Seu Progresso</span>
          <span className="text-brand-green font-bold text-sm">{completedCount} de 21 dias</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-brand-orange h-full rounded-full transition-all duration-500 ease-out"
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
              className={`bg-white rounded-2xl border transition-colors overflow-hidden ${
                isCompleted ? 'border-brand-green/30' : 'border-gray-100'
              }`}
            >
              {/* Card Header (Clickable) */}
              <button 
                onClick={() => setExpandedDay(isExpanded ? null : dayData.day)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    isCompleted ? 'bg-brand-green text-white' : 'bg-brand-green-light text-brand-green'
                  }`}>
                    {dayData.day}
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark">Dia {dayData.day}</h3>
                    <p className="text-xs text-gray-500">{dayData.focus}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isCompleted && <CheckCircle2 className="w-5 h-5 text-brand-green" />}
                  {isExpanded ? 
                    <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  }
                </div>
              </button>

              {/* Card Body (Expanded state) */}
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-gray-50 mt-2">
                  <div className="bg-brand-gray rounded-xl p-3 mb-4 mt-2">
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Dica do dia</span>
                    <p className="text-sm text-brand-dark mt-1 italic">"{dayData.tip}"</p>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Receita Indicada</span>
                    <p className="text-brand-green font-medium text-sm mt-1">{recipe?.title}</p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Seu Checklist</span>
                    
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
                            <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-300 group-hover:text-brand-orange transition-colors flex-shrink-0" />
                          )}
                          <span className={`text-sm ${isChecked ? 'text-gray-400 line-through' : 'text-brand-dark'}`}>
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
