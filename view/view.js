import { startGame } from "../controller/gameController.js";
import {
  startOptions,
  validateOptions,
} from "../controller/optionsController.js";
import { loadPlaylistPerso } from "../controller/genreController.js";

export const view = {
  body: document.querySelector("body"),

  // Interface de sélection
  interfaceSelection: document.querySelector("#body-selection"),

  // Interface de la partie et ses éléments
  interfacePartie: document.querySelector("#interface-partie"),
  playlistTitle: document.querySelector("#playlist-title"),
  cover: document.querySelector("#cover"),
  timer: document.querySelector("#timer"),
  response: document.querySelector("#response"),
  player: document.querySelector("#player"),
  score: document.querySelector("#score"),
  nbTracks: document.querySelector("#nb-tracks"),
  container: document.querySelector("#body-selection"),
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
  btnChercherPlaylist: document.querySelector("#btn-charger"),
  btnRetour: document.querySelector("#btn-retour-genres"),
  diffBtns: document.querySelectorAll(".diff-btn"),
  btnOptionsRetour: document.querySelector("#btn-options-retour"),
  btnOptionsValider: document.querySelector("#btn-options-valider"),
};

let currentTranslate = 0;

view.interfaceSelection.addEventListener("click", (event) => {
  const figures = view.interfaceSelection.querySelectorAll("figure");

  if (window.innerWidth > 900) {
    figures.forEach((figure) => {
      if (figure.contains(event.target)) {
        if (figure.classList.contains("active")) {
          startOptions(figure.dataset.playlist);
        } else {
          figures.forEach((figure) => {
            figure.classList.remove("active");
          });
          figure.classList.add("active");
          const dimensions = figure.getBoundingClientRect();

          if (dimensions.right > window.innerWidth) {
            currentTranslate += dimensions.width + 70;
            view.interfaceSelection.style.transform = `translateX(-${currentTranslate}px)`;
          } else if (dimensions.left < 0) {
            currentTranslate -= dimensions.width + 70;
            view.interfaceSelection.style.transform = `translateX(-${currentTranslate}px)`;
          }
        }
      }
    });
  } else {
    figures.forEach((figure) => {
      figure.classList.add("active");
      if (figure.contains(event.target)) {
        startOptions(figure.dataset.playlist);
        view.body.classList.add("no-scroll");
      }
    });
  }
});

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
});

view.btnChercherPlaylist.addEventListener("click", async () => {
  const link = view.playlistPerso.value;

  if (link) {
    const originalIcon = view.btnChercherPlaylist.innerHTML;

    view.btnChercherPlaylist.innerHTML = `
      <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
    `;
    view.btnChercherPlaylist.disabled = true;
    view.btnChercherPlaylist.style.cursor = "wait";

    await loadPlaylistPerso(link);

    view.btnChercherPlaylist.innerHTML = originalIcon;
    view.btnChercherPlaylist.disabled = false;
    view.btnChercherPlaylist.style.cursor = "pointer";
    view.playlistPerso.value = "";
  }
});

view.btnOptionsRetour.addEventListener("click", () => {
  view.optionsPartie.classList.add("hide");
  view.body.classList.remove("no-scroll");
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
