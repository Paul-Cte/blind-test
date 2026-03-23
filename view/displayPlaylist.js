import { view } from "./view.js";
import { changeFavorites, removePlaylist, estFavoris } from "../controller/genreController.js";
import { initPlaylists } from "../main.js";
import persist from "../model/persist.js";


export function displayPlaylistPerso(playlistData, playlistId) {
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
    initPlaylists();
  });
  const marqueurFavoris = document.createElement("p");
  estFavoris(playlistId) ? marqueurFavoris.textContent = "FAVORIS" : marqueurFavoris.textContent = "NON FAVORIS";
  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.textContent = "Supprimer";
  boutonSupprimer.addEventListener("click", (e) => {
    e.stopPropagation();
    persist.remove(playlistId);
    initPlaylists();
    persist.saveToLocalStorage();
  });
  boutons.appendChild(boutonFavoris);
  boutons.appendChild(boutonSupprimer);
  boutons.appendChild(marqueurFavoris);
  figure.appendChild(boutons);
  //if (index === 0) figure.classList.add("active");
  view.container.appendChild(figure);
}
