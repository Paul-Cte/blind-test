import { view } from "./view.js";
import {
  changeFavorites,
  removePlaylist,
  estFavoris,
} from "../controller/genreController.js";
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

  // --- BOUTON FAVORIS (COEUR) ---
  const boutonFavoris = document.createElement("button");
  boutonFavoris.classList.add("btn-fav-svg");

  // On vérifie si c'est un favori pour définir la couleur
  const isFav = estFavoris(playlistId);
  const heartFill = isFav ? "var(--deezer-purple)" : "none";
  const heartStroke = isFav ? "var(--deezer-purple)" : "white";

  boutonFavoris.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" 
         fill="${heartFill}" stroke="${heartStroke}" stroke-width="2" 
         stroke-linecap="round" stroke-linejoin="round" class="heart-icon">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  `;

  boutonFavoris.addEventListener("click", (e) => {
    e.stopPropagation();
    changeFavorites(playlistId);
    const isFav = estFavoris(playlistId);
    const svg = boutonFavoris.querySelector("svg");

    svg.setAttribute("fill", isFav ? "var(--deezer-purple)" : "none");
    svg.setAttribute("stroke", isFav ? "var(--deezer-purple)" : "white");
  });

  // --- BOUTON SUPPRIMER ---
  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.textContent = "Supprimer";
  boutonSupprimer.addEventListener("click", (e) => {
    e.stopPropagation();
    persist.remove(playlistId);
    initPlaylists();
    persist.saveToLocalStorage();
  });

  boutonSupprimer.classList.add("btn-supp");
  boutons.classList.add("boutons");

  // On ajoute les éléments
  boutons.appendChild(boutonFavoris);
  boutons.appendChild(boutonSupprimer);
  figure.appendChild(boutons);

  // --- GESTION DE LA POSITION (TOUT À GAUCHE) ET ACTIF ---
  const figuresExistantes = view.container.querySelectorAll("figure");
  figuresExistantes.forEach((fig) => fig.classList.remove("active"));

  figure.classList.add("active");
  view.container.prepend(figure);
}

export function displayAddPlaylist() {
  const figure = document.createElement("figure");
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = "Il faut ajouter une playlist";
  figure.appendChild(figcaption);
  view.container.appendChild(figure);
}
