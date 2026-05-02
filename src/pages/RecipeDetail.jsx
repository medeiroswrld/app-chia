import React from 'react';
import { ArrowLeft, Heart, Clock, ChefHat, CheckCircle2 } from 'lucide-react';

export default function RecipeDetail({ recipe, onBack, isFavorite, onToggleFavorite }) {
  return (
    <div className="pb-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header Image/Banner */}
      <div className="relative h-48 bg-brand-primary-light rounded-3xl mb-6 flex items-center justify-center overflow-hidden border border-border-subtle">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <span className="text-6xl z-10 drop-shadow-md">🌱</span>
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-surface/90 p-2 rounded-full shadow-sm text-text-muted hover:text-text-main"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <button 
          onClick={onToggleFavorite}
          className="absolute top-4 right-4 bg-surface/90 p-2 rounded-full shadow-sm"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-text-muted/50'}`} />
        </button>
      </div>

      {/* Title & Info */}
      <div className="mb-8">
        <span className="text-[10px] uppercase font-bold text-brand-accent tracking-wider bg-brand-accent/10 px-2 py-1 rounded-md">
          {recipe.category}
        </span>
        <h2 className="text-2xl font-bold text-text-main mt-3 mb-4 leading-tight">{recipe.name}</h2>
        
        <div className="flex items-center gap-4 bg-surface p-3 rounded-2xl border border-border-subtle shadow-sm">
          <div className="flex items-center gap-2 text-sm text-text-muted font-medium">
            <Clock className="w-4 h-4 text-brand-primary" />
            <span>{recipe.time}</span>
          </div>
          <div className="w-px h-4 bg-border-subtle"></div>
          <div className="flex items-center gap-2 text-sm text-text-muted font-medium">
            <ChefHat className="w-4 h-4 text-brand-accent" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Main Benefit */}
      <div className="bg-brand-primary-light border border-brand-primary/20 p-4 rounded-2xl mb-8 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wide">Benefício Principal</span>
          <p className="text-sm text-text-main mt-1">{recipe.benefit}</p>
          <p className="text-xs text-text-muted mt-1 font-medium">Melhor horário: {recipe.bestTime}</p>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mb-8">
        <h3 className="font-bold text-text-main text-lg mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center text-xs">1</span>
          Ingredientes
        </h3>
        <ul className="space-y-3">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx} className="flex items-center gap-3 bg-surface p-3 rounded-xl border border-border-subtle shadow-sm">
              <div className="w-2 h-2 rounded-full bg-brand-primary flex-shrink-0"></div>
              <span className="text-sm text-text-main">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div>
        <h3 className="font-bold text-text-main text-lg mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-xs">2</span>
          Modo de Preparo
        </h3>
        <div className="space-y-4">
          {recipe.preparation.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="font-bold text-text-muted/40 text-lg">{idx + 1}.</span>
              <p className="text-sm text-text-main mt-0.5 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Extra Tip */}
      {recipe.extraTip && (
        <div className="mt-8 bg-brand-accent/10 border border-brand-accent/20 p-4 rounded-2xl flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <span className="text-xs font-bold text-brand-accent uppercase tracking-wide">Dica Extra</span>
            <p className="text-sm text-text-main mt-1">{recipe.extraTip}</p>
          </div>
        </div>
      )}
      
    </div>
  );
}
