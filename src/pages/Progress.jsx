import React, { useState, useEffect } from 'react';
import { Target, Activity, Save, TrendingDown } from 'lucide-react';
import { progressService } from '../services/progressService';
import { recipesService } from '../services/recipesService';

export default function Progress() {
  const [stats, setStats] = useState({
    initialWeight: '',
    currentWeight: '',
    goalWeight: '',
    notes: '',
    energyLevel: 3,
    feelingToday: ''
  });
  const [saved, setSaved] = useState(false);
  const [completedDays, setCompletedDays] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    setStats(progressService.getStats());
    setCompletedDays(progressService.getCompletedDaysCount());
    setFavoritesCount(recipesService.getFavorites().length);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStats(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    progressService.saveStats(stats);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const progressPercent = Math.round((completedDays / 21) * 100);
  
  let weightDiff = null;
  if (stats.initialWeight && stats.currentWeight) {
    const diff = parseFloat(stats.initialWeight) - parseFloat(stats.currentWeight);
    if (!isNaN(diff)) {
      weightDiff = diff.toFixed(1);
    }
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brand-dark">Meu Progresso</h2>
        <p className="text-gray-500 text-sm mt-1">Acompanhe sua evolução diária</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card text-center py-4 bg-brand-green-light border-0">
          <div className="text-2xl font-bold text-brand-green mb-1">{progressPercent}%</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Protocolo<br/>Concluído</div>
        </div>
        <div className="card text-center py-4 bg-orange-50 border-0">
          <div className="text-2xl font-bold text-brand-orange mb-1">{favoritesCount}</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Receitas<br/>Favoritas</div>
        </div>
      </div>

      {weightDiff && parseFloat(weightDiff) > 0 && (
        <div className="bg-gradient-to-r from-brand-green to-[#43A047] rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-green-100 uppercase tracking-wider">Resultado Parcial</span>
            <div className="text-xl font-bold mt-1">Menos {weightDiff} kg</div>
          </div>
          <TrendingDown className="w-8 h-8 opacity-80" />
        </div>
      )}

      {/* Form */}
      <div className="card space-y-5">
        <h3 className="font-bold text-brand-dark flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-orange" /> Minhas Medidas
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Peso Inicial (kg)</label>
            <input 
              type="number" 
              step="0.1"
              name="initialWeight"
              value={stats.initialWeight}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green transition-shadow"
              placeholder="Ex: 75.5"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Peso Atual (kg)</label>
            <input 
              type="number" 
              step="0.1"
              name="currentWeight"
              value={stats.currentWeight}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green transition-shadow"
              placeholder="Ex: 73.0"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Minha Meta de Peso (kg)</label>
          <input 
            type="number" 
            step="0.1"
            name="goalWeight"
            value={stats.goalWeight}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green transition-shadow"
            placeholder="Ex: 68.0"
          />
        </div>
      </div>

      <div className="card space-y-5">
        <h3 className="font-bold text-brand-dark flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-green" /> Como estou me sentindo
        </h3>
        
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Nível de Energia (1 a 5)</label>
          <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => {
                  setStats(prev => ({ ...prev, energyLevel: level }));
                  setSaved(false);
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  stats.energyLevel >= level 
                    ? 'bg-brand-green text-white shadow-sm' 
                    : 'bg-white text-gray-400 border border-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Observações do dia</label>
          <textarea 
            name="feelingToday"
            value={stats.feelingToday}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green transition-shadow resize-none"
            placeholder="Como foi seu dia? Alguma dificuldade?"
          />
        </div>
      </div>

      <button 
        onClick={handleSave}
        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
          saved ? 'bg-brand-green-light text-brand-green' : 'bg-brand-green text-white hover:bg-green-600 shadow-sm active:scale-[0.98]'
        }`}
      >
        <Save className="w-5 h-5" />
        {saved ? 'Progresso salvo com sucesso!' : 'Salvar Progresso'}
      </button>

    </div>
  );
}
