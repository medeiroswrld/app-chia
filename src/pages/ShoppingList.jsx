import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Copy, Trash2, CheckCircle2 } from 'lucide-react';
import { shoppingCategories } from '../data/shoppingItems';
import { shoppingService } from '../services/shoppingService';

export default function ShoppingList() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCheckedItems(shoppingService.getCheckedItems());
  }, []);

  const handleToggle = (itemId) => {
    const newItems = shoppingService.toggleItem(itemId);
    setCheckedItems([...newItems]);
  };

  const handleClear = () => {
    if(window.confirm('Deseja limpar todas as marcações da lista?')) {
      shoppingService.clearAll();
      setCheckedItems([]);
    }
  };

  const handleCopy = () => {
    let text = "Lista de Compras - Chia Seca\n\n";
    shoppingCategories.forEach(cat => {
      text += `*${cat.name}*\n`;
      cat.items.forEach(item => {
        text += `- ${item.name} ${checkedItems.includes(item.id) ? '(OK)' : ''}\n`;
      });
      text += '\n';
    });
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brand-dark">Lista de Compras</h2>
        <p className="text-gray-500 text-sm mt-1">Tudo que você precisa para os 21 dias</p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3">
        <button 
          onClick={handleCopy}
          className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl flex justify-center items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copiado!' : 'Copiar Lista'}
        </button>
        <button 
          onClick={handleClear}
          className="flex-1 bg-white border border-red-100 text-red-500 py-2.5 px-4 rounded-xl flex justify-center items-center gap-2 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Limpar Marcações
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {shoppingCategories.map(category => (
          <div key={category.name} className="card p-0 overflow-hidden">
            <div className="bg-brand-green-light px-4 py-3 border-b border-gray-100">
              <h3 className="font-bold text-brand-dark text-sm">{category.name}</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {category.items.map(item => {
                const isChecked = checkedItems.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggle(item.id)}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors group"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-brand-green flex-shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-300 group-hover:text-brand-green transition-colors flex-shrink-0" />
                    )}
                    <span className={`text-sm ${isChecked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
