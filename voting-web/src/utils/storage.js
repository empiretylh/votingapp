// Local storage wrapper for encrypted storage functionality
export const storage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return Promise.resolve();
    } catch (error) {
      console.error('Error setting item:', error);
      return Promise.reject(error);
    }
  },

  getItem: (key) => {
    try {
      const value = localStorage.getItem(key);
      return Promise.resolve(value);
    } catch (error) {
      console.error('Error getting item:', error);
      return Promise.reject(error);
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return Promise.resolve();
    } catch (error) {
      console.error('Error removing item:', error);
      return Promise.reject(error);
    }
  },
};
