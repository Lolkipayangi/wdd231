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

// ---- Hidden timestamp field: stamp the moment the form loaded ----
document.querySelector("#timestamp").value = new Date().toString();

// ---- Membership benefit modals ----
document.querySelectorAll(".modal-link").forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("data-modal-target");
    const dialog = document.getElementById(targetId);
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  });
});

document.querySelectorAll(".benefits-modal .modal-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest("dialog").close();
  });
});
