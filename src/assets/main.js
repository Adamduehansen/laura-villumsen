const header = document.querySelector('header');
const button = document.querySelector('button');
const navigationMenu = document.querySelector('nav');

function onMenuToggleButtonClick() {
  navigationMenu.classList.toggle('hidden');
  header.classList.toggle('h-screen');
  button.classList.toggle('rotate-45');
  button.classList.toggle('rotate-0');
}

button.addEventListener('click', onMenuToggleButtonClick);
