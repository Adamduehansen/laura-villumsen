function onMenuToggleButtonClick() {
  navigationMenu.classList.toggle('hidden');
  header.classList.toggle('h-screen');
}

const header = document.querySelector('header');
const button = document.querySelector('button');
const navigationMenu = document.querySelector('nav');

button.addEventListener('click', onMenuToggleButtonClick);
