import { view } from "./view.js";
import {
  changeFavorites,
  removePlaylist,
} from "../controller/genreController.js";

export function displayPlaylistPerso(playlistData, playlistId, index) {
  const figure = document.createElement("figure");
  figure.dataset.playlist = playlistId;
  const img = document.createElement("img");
  img.draggable = false;
  img.src = playlistData.cover;
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = playlistData.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);

  const boutons = document.createElement("div");
  const boutonFavoris = document.createElement("button");
  boutonFavoris.textContent = "Favoris";
  boutonFavoris.addEventListener("click", (e) => {
    e.stopPropagation();
    changeFavorites(playlistId);
  });
  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.textContent = "Supprimer";
  boutonSupprimer.addEventListener("click", (e) => {
    e.stopPropagation();
    removePlaylist(playlistId);
  });
  boutons.appendChild(boutonFavoris);
  boutons.appendChild(boutonSupprimer);
  figure.appendChild(boutons);
  if (index === 0) figure.classList.add("active");
  view.container.appendChild(figure);
}
