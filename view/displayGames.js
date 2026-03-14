// blind-test/view/displayGames.js
import { view } from "./view.js";

export function startGameUI(partie, title) {
  view.interfacePartie.classList.remove("hide");
  view.playlistTitle.textContent = title;
  renderQuestion(partie.getCurrentTrack());
}

export function renderQuestion(track) {
  view.response.textContent = "";
  view.cover.src = track.album.cover_big;
  view.cover.style.filter = "blur(50px)";

  view.timer.textContent = "15";

  // Création de l'audio simple
  const audio = document.createElement("audio");
  audio.src = track.preview;
  audio.controls = false;
  audio.autoplay = true;

  // L'unique écouteur pour le timer
  audio.addEventListener("timeupdate", () => {
    view.timer.textContent = 15 - Math.floor(audio.currentTime);
    if (audio.currentTime >= 14) {
      view.timer.textContent = "";
      view.cover.style.filter = "blur(0px)";
      view.response.textContent = `${track.title} - ${track.artist.name}`;
      audio.pause();
    }
  });

  view.player.appendChild(audio);
}

export function updateScore(score) {
  // Met à jour l'affichage du score
}

export function endGame(finalScore) {
  // Affiche l'écran de fin de partie avec le score final
}
