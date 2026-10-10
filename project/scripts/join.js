import { initPage } from './main.js';
import { getTrails } from './data.js';

initPage();

const form = document.querySelector('#join-form');
const timestamp = document.querySelector('#timestamp');
const trailSelect = document.querySelector('#trail');
const message = document.querySelector('#message');
const counter = document.querySelector('#message-count');
const phone = document.querySelector('#phone');

// Record when the form was loaded so the thank you page can show it.
timestamp.value = new Date().toISOString();

// Message counter for the optional message box.
function updateCounter() {
  const used = message.value.length;
  const left = message.maxLength - used;
  counter.textContent = `${left} characters left`;
}
message.addEventListener('input', updateCounter);
updateCounter();

// Friendly validation text for the phone number pattern.
phone.addEventListener('input', () => phone.setCustomValidity(''));
phone.addEventListener('invalid', () => {
  if (phone.validity.patternMismatch) {
    phone.setCustomValidity('Enter a phone number with 9 to 15 digits, for example 0712 345 678 or +254 712 345 678.');
  }
});

// Add the trail names from the shared data to the "favourite trail" menu.
async function loadTrailOptions() {
  try {
    const trails = await getTrails();
    const options = [...trails]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((trail) => {
        const option = document.createElement('option');
        option.value = trail.name;
        option.textContent = trail.name;
        return option;
      });
    trailSelect.append(...options);
  } catch (error) {
    // The form still works without the list, so keep the default option only.
    console.error('Trail menu could not be filled:', error);
  }
}

loadTrailOptions();

form.addEventListener('submit', () => {
  timestamp.value = new Date().toISOString();
});
