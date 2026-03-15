// a
import { startGame } from "../controller/gameController.js";
import { view } from "../view/view.js";
import { loadPlaylistPerso } from "../controller/genreController.js";

let currentTranslate = 0;

view.interfaceSelection.addEventListener("click", (event) => {
  const figures = view.interfaceSelection.querySelectorAll("figure");

  if (window.innerWidth > 900) {
    figures.forEach((figure) => {
      if (figure.contains(event.target)) {
        if (figure.classList.contains("active")) {
          startGame(figure.dataset.playlist);
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

view.btnChercherPlaylist.addEventListener("click", () => {
  const link = view.playlistPerso.value ?? "";
  loadPlaylistPerso(link);
});
