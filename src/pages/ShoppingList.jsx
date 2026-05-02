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
        <h2 className="text-2xl font-bold text-text-main">Lista de Compras</h2>
        <p className="text-text-muted text-sm mt-1">Tudo que você precisa para os 21 dias</p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3">
        <button 
          onClick={handleCopy}
          className="flex-1 bg-surface border border-border-subtle text-text-main py-2.5 px-4 rounded-xl flex justify-center items-center gap-2 text-sm font-medium hover:bg-background transition-colors"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-brand-primary" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copiado!' : 'Copiar Lista'}
        </button>
        <button 
          onClick={handleClear}
          className="flex-1 bg-surface border border-red-100 text-red-500 py-2.5 px-4 rounded-xl flex justify-center items-center gap-2 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Limpar Marcações
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {shoppingCategories.map(category => (
          <div key={category.name} className="card p-0 overflow-hidden">
            <div className="bg-brand-primary-light px-4 py-3 border-b border-border-subtle">
              <h3 className="font-bold text-text-main text-sm">{category.name}</h3>
            </div>
            <div className="divide-y divide-border-subtle/50">
              {category.items.map(item => {
                const isChecked = checkedItems.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggle(item.id)}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-background transition-colors group"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-brand-primary flex-shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-border-subtle group-hover:text-brand-primary transition-colors flex-shrink-0" />
                    )}
                    <span className={`text-sm ${isChecked ? 'text-text-muted line-through' : 'text-text-main'}`}>
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
