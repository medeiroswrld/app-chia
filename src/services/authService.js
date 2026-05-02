import { storage } from './storage';

const AUTH_KEY = 'chiaSecaUser';

export const authService = {
  login: (email) => {
    const user = {
      email,
      firstAccess: new Date().toISOString()
    };
    storage.set(AUTH_KEY, user);
    return user;
  },
  
  logout: () => {
    storage.remove(AUTH_KEY);
  },
  
  getCurrentUser: () => {
    return storage.get(AUTH_KEY);
  },
  
  getCurrentEmail: () => {
    const user = storage.get(AUTH_KEY);
    return user ? user.email : 'guest';
  },
  
  isAuthenticated: () => {
    return !!storage.get(AUTH_KEY);
  }
};
