import React, { useState } from 'react';
import { Search, Heart, Clock, ChevronRight } from 'lucide-react';
import { recipes } from '../data/recipes';
import { recipesService } from '../services/recipesService';
import RecipeDetail from './RecipeDetail';

export default function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(recipesService.getFavorites());

  const categories = ['Todas', 'Para secar', 'Shakes', 'Café da manhã', 'Sobremesas', 'Rápidas'];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = activeCategory === 'Todas' || recipe.category === activeCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleFavorite = (e, recipeId) => {
    e.stopPropagation();
    const newFavorites = recipesService.toggleFavorite(recipeId);
    setFavorites([...newFavorites]);
  };

  if (selectedRecipe) {
    return (
      <RecipeDetail 
        recipe={selectedRecipe} 
        onBack={() => setSelectedRecipe(null)} 
        isFavorite={favorites.includes(selectedRecipe.id)}
        onToggleFavorite={(e) => handleToggleFavorite(e, selectedRecipe.id)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-main">Receitas</h2>
        <p className="text-text-muted text-sm mt-1">Deliciosas e práticas</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text-muted" />
        </div>
        <input
          type="text"
          placeholder="Buscar receita..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border-subtle bg-surface text-text-main shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
        />
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-4 px-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
              activeCategory === category 
                ? 'bg-brand-primary text-white border border-brand-primary' 
                : 'bg-surface text-text-muted border border-border-subtle'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recipe List */}
      <div className="grid gap-4">
        {filteredRecipes.map(recipe => (
          <div 
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="card cursor-pointer group hover:border-brand-primary/30 transition-colors flex gap-4"
          >
            <div className="w-20 h-20 bg-brand-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-brand-accent tracking-wider">
                  {recipe.category}
                </span>
                <button 
                  onClick={(e) => handleToggleFavorite(e, recipe.id)}
                  className="p-1 -mr-1"
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(recipe.id) ? 'fill-red-500 text-red-500' : 'text-text-muted/50'}`} 
                  />
                </button>
              </div>
              <h3 className="font-bold text-text-main text-sm leading-tight mt-1 mb-2 group-hover:text-brand-primary transition-colors">
                {recipe.name}
              </h3>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{recipe.time}</span>
                </div>
                <span>•</span>
                <span>{recipe.difficulty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredRecipes.length === 0 && (
        <div className="text-center py-10 text-text-muted">
          Nenhuma receita encontrada.
        </div>
      )}
    </div>
  );
}
