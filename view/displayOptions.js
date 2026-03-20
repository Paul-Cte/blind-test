import { view } from "./view.js";

export function startOptionsUI(playlistId, genre) {
  // Masquer la sélection
  view.interfaceSelection.parentElement
    .querySelector("#interface-selection")
    ?.classList.add("hide");

  view.optionsPartie.classList.remove("hide");

  view.genreChoisiTitle.textContent = genre.name ?? genre.title;
  view.genreChoisiImg.src = genre.picture_big;
  view.genreChoisiImg.alt = genre.name ?? genre.title;

  view.optionsPartie.dataset.playlistId = playlistId;
}

export function hideOptionsUI() {
  view.optionsPartie.classList.add("hide");
  view.genreChoisiImg.src = "";
  view.genreChoisiTitle.textContent = "";
}

export function getOptionsValues() {
  // On cherche le bouton qui a la classe 'active'
  const activeBtn = document.querySelector(".diff-btn.active");
  const guessTime = activeBtn ? parseInt(activeBtn.dataset.time, 10) : 20;
  const playlistId = view.optionsPartie.dataset.playlistId;

  return { guessTime, playlistId };
}
