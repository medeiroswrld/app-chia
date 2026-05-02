import { storage } from './storage';
import { authService } from './authService';
import { protocolDays } from '../data/protocolDays';

const getProgressKey = () => `chiaSecaProgress_${authService.getCurrentEmail()}`;
const getStatsKey = () => `chiaSecaStats_${authService.getCurrentEmail()}`;

export const progressService = {
  getProtocolProgress: () => {
    return storage.get(getProgressKey(), {});
  },
  
  saveDayProgress: (dayId, data) => {
    const current = progressService.getProtocolProgress();
    current[dayId] = { ...current[dayId], ...data };
    storage.set(getProgressKey(), current);
  },
  
  getCompletedDaysCount: () => {
    const current = progressService.getProtocolProgress();
    return Object.values(current).filter(day => day.completed).length;
  },
  
  getCurrentDayNumber: () => {
    const completed = progressService.getCompletedDaysCount();
    return Math.min(completed + 1, protocolDays.length);
  },
  
  getStats: () => {
    return storage.get(getStatsKey(), {
      initialWeight: '',
      currentWeight: '',
      goalWeight: '',
      notes: '',
      energyLevel: 3,
      feelingToday: ''
    });
  },
  
  saveStats: (stats) => {
    storage.set(getStatsKey(), stats);
  }
};
