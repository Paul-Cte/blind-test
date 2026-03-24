import { view } from "./view.js";

// Affiche l'interface des options du jeu
export function startOptionsUI(playlistId, playlist) {
  view.interfaceSelection.parentElement
    .querySelector("#interface-selection")
    ?.classList.add("hide");

  view.optionsPartie.classList.remove("hide");
  view.genreChoisiTitle.textContent = playlist.title;
  view.genreChoisiImg.src = playlist.cover;
  view.genreChoisiImg.alt = playlist.title;

  view.optionsPartie.dataset.playlistId = playlistId;
}

// Masque l'interface des options du jeu
export function hideOptionsUI() {
  view.optionsPartie.classList.add("hide");
  view.genreChoisiImg.src = "";
  view.genreChoisiTitle.textContent = "";
}

/**
 * Récupère les options du jeu sélectionnées (difficulté et playlist)
 * @returns {Object} Objet avec guessTime et playlistId
 */
export function getOptionsValues() {
  const activeBtn = document.querySelector(".diff-btn.active");
  const guessTime = activeBtn ? parseInt(activeBtn.dataset.time, 10) : 20;
  const playlistId = view.optionsPartie.dataset.playlistId;

  return { guessTime, playlistId };
}
