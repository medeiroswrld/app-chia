import { storage } from './storage';
import { authService } from './authService';

const getFavoritesKey = () => `chiaSecaFavorites_${authService.getCurrentEmail()}`;

export const recipesService = {
  getFavorites: () => {
    return storage.get(getFavoritesKey(), []);
  },
  
  toggleFavorite: (recipeId) => {
    const favorites = recipesService.getFavorites();
    const index = favorites.indexOf(recipeId);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(recipeId);
    }
    
    storage.set(getFavoritesKey(), favorites);
    return favorites;
  },
  
  isFavorite: (recipeId) => {
    const favorites = recipesService.getFavorites();
    return favorites.includes(recipeId);
  }
};
