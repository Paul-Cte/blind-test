// a
import { startGame } from "../controller/gameController.js"
import { startOptions, validateOptions } from "../controller/optionsController.js";
import { view } from "../view/view.js";
import { loadPlaylistPerso } from "../controller/genreController.js";
import { initGenres } from "../main.js";

let currentTranslate = 0;

view.interfaceSelection.addEventListener("click", (event) => {
  const figures = view.interfaceSelection.querySelectorAll("figure");

  if (window.innerWidth > 900) {
    figures.forEach((figure) => {
      if (figure.contains(event.target)) {
        if (figure.classList.contains("active")) {
          startOptions(figure.dataset.genre, figure.dataset.playlist);
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
})

view.btnOptionsValider.addEventListener("click", () => {
    view.optionsPartie.classList.add("hide");
    startGame(validateOptions());
})
