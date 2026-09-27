// ---- Hamburger navigation toggle ----
const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ---- Footer: copyright year + last modified date ----
document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  `Last Updated: ${document.lastModified}`;

// ---- Membership level lookup ----
const membershipLabels = {
  1: "Member",
  2: "Silver Member",
  3: "Gold Member",
};

// ---- Fetch member data ----
async function getMemberData() {
  const directoryEl = document.querySelector("#directory");
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    directoryEl.innerHTML =
      "<p class='directory-loading'>Sorry, member information could not be loaded right now.</p>";
    console.error("Error fetching member data:", error);
  }
}

// ---- Render member cards ----
const EAGER_LOAD_COUNT = 3;

function displayMembers(members) {
  const directoryEl = document.querySelector("#directory");
  directoryEl.innerHTML = "";

  members.forEach((member, index) => {
    const card = document.createElement("section");
    card.classList.add("member-card");
    const loadingAttr = index < EAGER_LOAD_COUNT ? "eager" : "lazy";

    card.innerHTML = `
      <img src="images/businesses/${member.image}" alt="${member.name} logo" loading="${loadingAttr}" width="200" height="200">
      <span class="badge badge-${member.membership}">${membershipLabels[member.membership]}</span>
      <h2 class="member-name">${member.name}</h2>
      <p class="member-tagline">${member.tagline}</p>
      <p class="member-detail"><strong>Address:</strong> <span>${member.address}</span></p>
      <p class="member-detail"><strong>Phone:</strong> <span>${member.phone}</span></p>
      <p class="member-detail">
        <strong>Website:</strong>
        <a class="member-website" href="${member.url}" target="_blank" rel="noopener">${member.url.replace(/^https?:\/\//, "")}</a>
      </p>
    `;

    directoryEl.appendChild(card);
  });
}

// ---- Grid / list view toggle ----
const directoryEl = document.querySelector("#directory");
const gridBtn = document.querySelector("#gridViewBtn");
const listBtn = document.querySelector("#listViewBtn");

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

function setView(view) {
  if (view === "list") {
    directoryEl.classList.add("list-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
    listBtn.setAttribute("aria-pressed", "true");
    gridBtn.setAttribute("aria-pressed", "false");
  } else {
    directoryEl.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.setAttribute("aria-pressed", "false");
  }
}

// ---- Initialize ----
getMemberData();
setView("grid");