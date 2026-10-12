const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
const container = document.getElementById('spotlights');
const yearSpan = document.getElementById('year');

yearSpan.textContent = new Date().getFullYear();

function buildCard(member) {
  const card = document.createElement('article');
  card.className = 'spot';

  const img = document.createElement('img');
  img.src = `images/${member.image}`;
  img.alt = `${member.name} logo`;
  img.width = 64;
  img.height = 64;
  img.loading = 'lazy';
  img.addEventListener('error', () => img.remove());

  const name = document.createElement('h3');
  name.textContent = member.name;

  const tier = document.createElement('span');
  tier.className = 'tier gold';
  tier.textContent = `${levels[member.membership]} member`;

  const tagline = document.createElement('p');
  tagline.className = 'tagline';
  tagline.textContent = member.tagline;

  const meta = document.createElement('p');
  meta.className = 'meta';
  const link = document.createElement('a');
  link.href = member.url;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'Visit website';
  meta.append(member.address, document.createElement('br'), member.phone, document.createElement('br'), link);

  card.append(img, name, tier, tagline, meta);
  return card;
}

async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();

    const gold = data.members
      .filter((member) => member.membership === 3)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    if (gold.length === 0) {
      container.innerHTML = '<p class="status">No spotlight members yet.</p>';
      return;
    }

    container.innerHTML = '';
    gold.forEach((member) => container.append(buildCard(member)));
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p class="status">Members could not be loaded. Try the <a href="directory.html">directory page</a> instead.</p>';
  }
}

loadSpotlights();
