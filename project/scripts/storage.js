// Saved trails and visit tracking, kept in localStorage.
// Every call is wrapped in try/catch because storage can be blocked or full.

const FAVORITES_KEY = 'rtk-favorites';
const VISIT_KEY = 'rtk-last-visit';

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Could not read saved trails:', error);
    return [];
  }
}

function setFavorites(ids) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    return true;
  } catch (error) {
    console.error('Could not save trails:', error);
    return false;
  }
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

// Returns the new saved state for the trail.
export function toggleFavorite(id) {
  const favorites = getFavorites();
  const next = favorites.includes(id)
    ? favorites.filter((item) => item !== id)
    : [...favorites, id];
  setFavorites(next);
  return next.includes(id);
}

// Stores this visit and returns the previous visit as a Date, or null on a first visit.
export function recordVisit() {
  let previous = null;
  try {
    const raw = localStorage.getItem(VISIT_KEY);
    if (raw) {
      const date = new Date(raw);
      if (!Number.isNaN(date.getTime())) previous = date;
    }
    localStorage.setItem(VISIT_KEY, new Date().toISOString());
  } catch (error) {
    console.error('Could not record visit:', error);
  }
  return previous;
}
