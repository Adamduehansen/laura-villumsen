const header = document.querySelector('header');
const button = document.querySelector('button');
const navigationMenu = document.querySelector('nav');

function onMenuToggleButtonClick() {
  navigationMenu.classList.toggle('translate-y-0');
  navigationMenu.classList.toggle('-translate-y-full');
  button.classList.toggle('rotate-45');
  button.classList.toggle('rotate-0');
}

button.addEventListener('click', onMenuToggleButtonClick);
