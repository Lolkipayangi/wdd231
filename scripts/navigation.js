// State the selected elements that we are going to use.
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

//Temporary toggle the show class off and on
newbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});



document.getElementById("#currentyear").textContent =
    new Date().getFullYear();

document.getElementById("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;

