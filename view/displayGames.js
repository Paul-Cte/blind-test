import { view } from "./view.js";

export function startGameUI(partie, title) {
  view.interfacePartie.classList.remove("hide");
  view.playlistTitle.textContent = title;
  renderQuestion(partie);
}

export function renderQuestion(partie) {
  let track = partie.getCurrentTrack();
  view.response.textContent = "";
  view.cover.src = track.album.cover_big;
  view.cover.style.filter = "blur(50px)";

  view.timer.textContent = "15";

  // Création de l'audio
  const audio = document.createElement("audio");
  audio.src = track.preview;
  audio.controls = false;
  audio.autoplay = true;
  view.player.appendChild(audio);

  // bouton suivant disabled
  view.btnSuivant.classList.add("disabled");
  view.btnSuivant.disabled = true;
  view.btnValider.disabled = true;
  view.btnValider.classList.add("disabled");

  audio.addEventListener("timeupdate", () => {
    view.timer.textContent = 15 - Math.floor(audio.currentTime);
    if (audio.currentTime >= 15) {
      view.btnValider.disabled = false;
      view.btnValider.classList.remove("disabled");
      view.timer.textContent = "";
      audio.pause();
    }
  });

  // clique sur le bouton valider
  view.btnValider.addEventListener("click", () => {
    view.response.textContent = `${track.title} - ${track.artist.name}`;
    view.btnSuivant.classList.remove("disabled");
    view.btnSuivant.disabled = false;
    view.cover.style.filter = "blur(0px)";
    view.btnValider.disabled = true;
    view.btnValider.classList.add("disabled");
  });

  //clique sur le bouton suivant
  view.btnSuivant.addEventListener("click", () => {
    view.player.removeChild(audio);
    if (partie.nextTrack()) {
      renderQuestion(partie);
    } else {
      endGame(partie.score);
    }
  });
}

export function updateScore(score) {
  // Met à jour l'affichage du score
}

export function endGame(finalScore) {
  alert(`Partie terminée ! Votre score final est : ${finalScore}`);
}
