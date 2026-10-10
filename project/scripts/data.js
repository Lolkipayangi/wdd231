// Loads the trail data once and shares it between pages.

let cache = null;

export async function getTrails() {
  if (cache) return cache;
  try {
    const response = await fetch('data/trails.json');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('The trail data is not in the expected format.');
    }
    cache = data;
    return cache;
  } catch (error) {
    console.error('Could not load trails:', error);
    throw error;
  }
}

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
