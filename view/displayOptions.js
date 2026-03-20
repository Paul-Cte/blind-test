import { view } from "./view.js";

export function startOptionsUI(playlistId, genre) {
  // Masquer la sélection
  view.interfaceSelection.parentElement
    .querySelector("#interface-selection")
    ?.classList.add("hide");

  // Afficher l'interface options
  view.optionsPartie.classList.remove("hide");

  // Vider le genre précédent si on revient aux options
  view.genreChoisi.innerHTML = "";

  // Afficher la vignette du genre choisi
  const div = document.createElement("div");
  div.classList.add("genre-choisi-figure");

  const img = document.createElement("img");
  img.src = genre.picture_big;
  img.draggable = false;
  img.alt = genre.name;

  const title = document.createElement("h1");
  title.textContent = genre.name ?? genre.title;

  div.appendChild(title);
  div.appendChild(img);
  view.genreChoisi.appendChild(div);

  // Stocker l'ID de la playlist pour que le contrôleur puisse le récupérer au moment de valider
  view.optionsPartie.dataset.playlistId = playlistId;
}

export function hideOptionsUI() {
  view.optionsPartie.classList.add("hide");
  view.genreChoisi.innerHTML = "";
}

export function getOptionsValues() {
  const guessTime = parseInt(view.inputGuessTime.value, 10) || 15;
  const playlistId = view.optionsPartie.dataset.playlistId;
  return { guessTime, playlistId };
}
