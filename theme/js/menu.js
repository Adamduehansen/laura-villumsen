const menuButton = document.querySelector("#md-menu-button");
const mdMenu = document.querySelector("#md-menu-list");

menuButton.addEventListener("click", () => {
  mdMenu.classList.toggle("closed");
});
