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

// ---- Display the required fields submitted from join.html ----
const params = new URLSearchParams(window.location.search);

const fieldsToShow = [
  { param: "firstName", label: "First name" },
  { param: "lastName", label: "Last name" },
  { param: "email", label: "Email address" },
  { param: "mobilePhone", label: "Mobile phone" },
  { param: "businessName", label: "Business name" },
  { param: "timestamp", label: "Submitted" },
];

const summaryList = document.querySelector("#summaryList");

fieldsToShow.forEach((field) => {
  const value = params.get(field.param) || "Not provided";
  const li = document.createElement("li");

  const labelSpan = document.createElement("span");
  labelSpan.classList.add("label");
  labelSpan.textContent = field.label;

  const valueSpan = document.createElement("span");
  valueSpan.classList.add("value");
  valueSpan.textContent = value;

  li.appendChild(labelSpan);
  li.appendChild(valueSpan);
  summaryList.appendChild(li);
});
