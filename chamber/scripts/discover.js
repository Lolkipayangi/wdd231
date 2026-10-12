const placesContainer = document.getElementById('places');
const visitMessage = document.getElementById('visit-message');
const visitText = document.getElementById('visit-text');
const dismissButton = document.getElementById('dismiss-visit');
const yearSpan = document.getElementById('year');

const VISIT_KEY = 'mtwapa-last-visit';
const MS_PER_DAY = 1000 * 60 * 60 * 24;

yearSpan.textContent = new Date().getFullYear();

/* Visit message, based on the last visit stored in localStorage */
function showVisitMessage() {
  let message = 'Welcome! Let us know if you have any questions.';

  try {
    const lastVisit = Number(localStorage.getItem(VISIT_KEY));
    const now = Date.now();

    if (lastVisit) {
      const days = Math.floor((now - lastVisit) / MS_PER_DAY);
      if (days < 1) {
        message = 'Back so soon! Awesome!';
      } else {
        message = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
      }
    }

    localStorage.setItem(VISIT_KEY, String(now));
  } catch (error) {
    console.error('Storage is not available:', error);
  }

  visitText.textContent = message;
  visitMessage.hidden = false;
}

dismissButton.addEventListener('click', () => {
  visitMessage.hidden = true;
});

/* Place cards, built from data/discover.json */
function buildPlace(place) {
  const item = document.createElement('article');
  item.className = 'place-item';

  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = place.image;
  img.alt = place.alt;
  img.width = 300;
  img.height = 200;
  img.loading = 'lazy';
  figure.append(img);

  const body = document.createElement('div');
  body.className = 'place-body';

  const name = document.createElement('h2');
  name.textContent = place.name;

  const address = document.createElement('address');
  address.textContent = place.address;

  const description = document.createElement('p');
  description.textContent = place.description;

  body.append(name, address, description);
  item.append(figure, body);
  return item;
}

async function loadPlaces() {
  try {
    const response = await fetch('data/discover.json');
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();

    placesContainer.innerHTML = '';
    data.places.forEach((place) => placesContainer.append(buildPlace(place)));
  } catch (error) {
    console.error(error);
    placesContainer.innerHTML = '<p class="status">Places could not be loaded. Please try again later.</p>';
  }
}

showVisitMessage();
loadPlaces();
