/**
 * ChronoAge — Storage Module
 * Manages LocalStorage persistence for themes, saved profiles, and history.
 */

const StorageManager = (() => {
  const THEME_KEY = 'chronoage_theme';
  const PROFILES_KEY = 'chronoage_profiles';
  const HISTORY_KEY = 'chronoage_history';

  // --- Theme Management ---
  const getSavedTheme = () => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      // System preference detection
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch (e) {
      console.warn('LocalStorage unavailable for theme reading:', e);
      return 'light';
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('LocalStorage unavailable for theme saving:', e);
    }
  };

  // --- Saved Profiles Management ---
  const getProfiles = () => {
    try {
      const data = localStorage.getItem(PROFILES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading profiles from LocalStorage:', e);
      return [];
    }
  };

  const saveProfile = (profile) => {
    try {
      const profiles = getProfiles();
      const existingIndex = profiles.findIndex(p => p.id === profile.id);
      if (existingIndex > -1) {
        profiles[existingIndex] = profile;
      } else {
        profiles.unshift(profile);
      }
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
      return true;
    } catch (e) {
      console.error('Error saving profile:', e);
      return false;
    }
  };

  const deleteProfile = (profileId) => {
    try {
      let profiles = getProfiles();
      profiles = profiles.filter(p => p.id !== profileId);
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
      return true;
    } catch (e) {
      console.error('Error deleting profile:', e);
      return false;
    }
  };

  // --- Recent Calculation History ---
  const getHistory = () => {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading history:', e);
      return [];
    }
  };

  const addToHistory = (entry) => {
    try {
      let history = getHistory();
      // Remove duplicates with same birthDate
      history = history.filter(h => h.birthDate !== entry.birthDate);
      history.unshift({
        id: 'hist_' + Date.now(),
        birthDate: entry.birthDate,
        birthTime: entry.birthTime || '00:00',
        timestamp: new Date().toISOString(),
        ageSummary: entry.ageSummary || ''
      });
      // Keep up to 8 entries
      if (history.length > 8) {
        history = history.slice(0, 8);
      }
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Error updating history:', e);
    }
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.warn('Error clearing history:', e);
    }
  };

  return {
    getSavedTheme,
    saveTheme,
    getProfiles,
    saveProfile,
    deleteProfile,
    getHistory,
    addToHistory,
    clearHistory
  };
})();

