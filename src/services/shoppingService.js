import { storage } from './storage';
import { authService } from './authService';

const getShoppingKey = () => `chiaSecaShoppingList_${authService.getCurrentEmail()}`;

export const shoppingService = {
  getCheckedItems: () => {
    return storage.get(getShoppingKey(), []);
  },
  
  toggleItem: (itemId) => {
    const items = shoppingService.getCheckedItems();
    const index = items.indexOf(itemId);
    
    if (index > -1) {
      items.splice(index, 1);
    } else {
      items.push(itemId);
    }
    
    storage.set(getShoppingKey(), items);
    return items;
  },
  
  isChecked: (itemId) => {
    const items = shoppingService.getCheckedItems();
    return items.includes(itemId);
  },
  
  clearAll: () => {
    storage.remove(getShoppingKey());
  }
};
