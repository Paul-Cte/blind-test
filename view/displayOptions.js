/*import { view } from "./view.js";

export function startOptionsUI(playlistId, genre) {
  view.optionsPartie.classList.remove("hide");

  const figure = document.createElement("figure");

  const img = document.createElement("img");

  img.src = genre.picture_big;
  img.draggable = false;

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = genre.name;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  view.genreChoisi.appendChild(figure);
}
*/

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
  const figure = document.createElement("figure");
  figure.classList.add("genre-choisi-figure");

  const img = document.createElement("img");
  img.src = genre.picture_big;
  img.draggable = false;
  img.alt = genre.name;

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = genre.name ?? genre.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  view.genreChoisi.appendChild(figure);

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