import { places } from "../data/discover.mjs";

/* ---------- Footer: year + last modified (kept from other pages) ---------- */
const yearEl = document.getElementById("currentYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();
const modEl = document.getElementById("lastModified");
if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;

/* ---------- Mobile navigation toggle ---------- */
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");
if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

/* ---------- Visit message (localStorage) ---------- */
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const KEY = "mtwapa-last-visit";

function visitMessage() {
  const now = Date.now();
  let last = null;
  try {
    last = Number(localStorage.getItem(KEY)) || null;
    localStorage.setItem(KEY, String(now));
  } catch {
    /* storage unavailable: treat as first visit */
  }

  if (!last) return "Welcome! Let us know if you have any questions.";

  const days = Math.floor((now - last) / MS_PER_DAY);
  if (days < 1) return "Back so soon! Awesome!";
  return `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}

const banner = document.getElementById("visitMessage");
if (banner) {
  banner.querySelector("p").textContent = visitMessage();
  banner.querySelector("button").addEventListener("click", () => banner.remove());
}

/* ---------- Cards ---------- */
const container = document.getElementById("discoverGrid");

places.forEach((place, i) => {
  const card = document.createElement("article");
  card.className = "discover-card";
  card.style.gridArea = `card${i + 1}`;

  const title = document.createElement("h2");
  title.textContent = place.name;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = place.image;
  img.alt = place.alt;
  img.width = 300;
  img.height = 200;
  img.loading = "lazy";
  figure.append(img);

  const address = document.createElement("address");
  address.textContent = place.address;

  const desc = document.createElement("p");
  desc.textContent = place.description;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "learn-more";
  btn.textContent = "Learn more";
  btn.setAttribute("aria-label", `Learn more about ${place.name}`);
  btn.addEventListener("click", () => {
    const q = encodeURIComponent(`${place.name} ${place.address}`);
    window.open(`https://www.google.com/maps/search/${q}`, "_blank", "noopener");
  });

  card.append(title, figure, address, desc, btn);
  container.append(card);
});
