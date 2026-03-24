import { startGame } from "../controller/gameController.js";
import {
  startOptions,
  validateOptions,
} from "../controller/optionsController.js";
import { loadPlaylistPerso } from "../controller/genreController.js";
import { initPlaylists } from "../main.js";

export const view = {
  body: document.querySelector("body"),

  // Interface de sélection
  interfaceSelection: document.querySelector("#interface-selection"),
  container: document.querySelector("#body-selection"),
  containerFavorites: document.querySelector("#favorites-selection"),

  // Interface de la partie et ses éléments
  interfacePartie: document.querySelector("#interface-partie"),
  playlistTitle: document.querySelector("#playlist-title"),
  cover: document.querySelector("#cover"),
  timer: document.querySelector("#timer"),
  response: document.querySelector("#response"),
  player: document.querySelector("#player"),
  score: document.querySelector("#score"),
  nbTracks: document.querySelector("#nb-tracks"),
  optionsPartie: document.querySelector("#interface-options"),
  genreChoisi: document.querySelector("#genre-choisi"),
  genreChoisiTitle: document.querySelector("#genre-choisi-title"),
  genreChoisiImg: document.querySelector("#genre-choisi-img"),

  // Boutons et inputs
  btnQuitter: document.querySelector("#btn-quitter-bt"),
  inputResponse: document.querySelector("#response-part input"),
  btnValider: document.querySelector("#btn-valider"),
  btnSuivant: document.querySelector("#btn-suivant"),
  btnSkip: document.querySelector("#btn-skip"),
  suggestionsList: document.querySelector("#suggestions"),
  playlistPerso: document.querySelector("#input-playlist"),
  btnChargerPlaylist: document.querySelector("#btn-charger"),
  playlistRecherche: document.querySelector("#input-recherche"),
  btnRetour: document.querySelector("#btn-retour-genres"),
  diffBtns: document.querySelectorAll(".diff-btn"),
  btnOptionsRetour: document.querySelector("#btn-options-retour"),
  btnOptionsValider: document.querySelector("#btn-options-valider"),
};

// --- SLIDERS ---
view.interfaceSelection.addEventListener("click", (e) => {
  // On cherche si on a cliqué sur une figure (une carte)
  const figure = e.target.closest("figure");

  // Si on clique sur un bouton "Favoris" ou "Supprimer", on ne lance pas la partie
  if (e.target.closest("button")) return;

  if (figure && figure.dataset.playlist) {
    startOptions(figure.dataset.playlist);
    view.body.classList.add("no-scroll");
  }
});

// --- BOUTON QUITTER ---
view.btnQuitter.addEventListener("click", () => {
  const audioEnCours = view.player.querySelector("audio");
  if (audioEnCours) {
    audioEnCours.pause();
    audioEnCours.remove();
  }
  view.timer.textContent = "";
  view.response.textContent = "";
  view.inputResponse.value = "";
  view.cover.src = "";
  view.playlistTitle.textContent = "";
  view.interfacePartie.classList.add("hide");
  view.body.classList.remove("no-scroll");

  view.interfaceSelection.classList.remove("hide");
});

// --- BOUTON CHARGER PLAYLIST ---
view.btnChargerPlaylist.addEventListener("click", async () => {
  const link = view.playlistPerso.value;

  if (link) {
    const originalIcon = view.btnChargerPlaylist.innerHTML;

    view.btnChargerPlaylist.innerHTML = `
      <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
    `;
    view.btnChargerPlaylist.disabled = true;
    view.btnChargerPlaylist.style.cursor = "wait";

    await loadPlaylistPerso(link);

    view.btnChargerPlaylist.innerHTML = originalIcon;
    view.btnChargerPlaylist.disabled = false;
    view.btnChargerPlaylist.style.cursor = "pointer";
    view.playlistPerso.value = "";
  }
});

// --- BOUTON CHERCHER PLAYLIST ---
view.playlistRecherche.addEventListener("keyup", async () => {
  const recherche = view.playlistRecherche.value;
  if (recherche) {
    await initPlaylists(recherche);
  } else {
    await initPlaylists();
  }
});

// --- OPTIONS ---
view.btnOptionsRetour.addEventListener("click", () => {
  view.optionsPartie.classList.add("hide");
  view.body.classList.remove("no-scroll");
  view.interfaceSelection.classList.remove("hide");
});

view.btnOptionsValider.addEventListener("click", () => {
  view.optionsPartie.classList.add("hide");
  startGame(validateOptions());
});

view.diffBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    view.diffBtns.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
  });
});
