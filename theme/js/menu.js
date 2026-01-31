const menuButton = document.querySelector("#md-menu__button");
const mdMenu = document.querySelector("#md-menu__list");

menuButton.addEventListener("click", () => {
  mdMenu.classList.toggle("closed");
});
