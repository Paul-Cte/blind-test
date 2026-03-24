import { view } from "./view.js";

let currentAudio = null;

// Affiche l'interface du jeu et la première question
export function startGameUI(partie, title) {
  view.interfacePartie.classList.remove("hide");
  view.playlistTitle.textContent = title;
  renderQuestion(partie);
}

// Affiche une question et configure l'interface
export function renderQuestion(partie) {
  const track = partie.getCurrentTrack();
  setupQuestionUI(partie, track);
  const control = manageAudioAndTimer(partie, track);
  setupSuggestions(partie);
  setupGameButtons(partie, control);
}

// Initialise l'interface de la question
function setupQuestionUI(partie, track) {
  view.response.textContent = "";
  view.cover.src = track.cover;
  view.cover.style.filter = "blur(50px)";
  view.timer.textContent = partie.guessTime;

  // on désactive les boutons jusqu'à ce que l'audio commence à jouer
  view.btnSuivant.classList.add("disabled");
  view.btnSuivant.disabled = true;
  view.btnValider.disabled = true;
  view.btnValider.classList.add("disabled");

  updateScore(partie);
  updateNbTracks(partie);
}

//Gère la lecture audio et le minuteur dégressif et retourne un objet de contrôle pour gérer la soumission de réponses
function manageAudioAndTimer(partie, track) {
  // Nettoyer l'audio précédent s'il existe
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.remove();
  }

  currentAudio = document.createElement("audio");
  currentAudio.src = track.preview;
  currentAudio.autoplay = true;
  view.player.appendChild(currentAudio);

  let hasAnswered = false;

  const triggerAnswer = (manualAnswer = null) => {
    if (hasAnswered) return;
    hasAnswered = true;
    currentAudio.pause();
    view.timer.textContent = "";

    const finalAnswer = manualAnswer ?? view.inputResponse.value ?? "";
    showAnswer(partie, finalAnswer);
  };

  currentAudio.addEventListener("timeupdate", () => {
    if (hasAnswered) return;

    view.timer.textContent =
      partie.guessTime - Math.floor(currentAudio.currentTime);

    if (currentAudio.currentTime >= partie.guessTime) {
      triggerAnswer();
    } else {
      // ça active le bouton valider une fois que l'audio commence à jouer
      view.btnValider.disabled = false;
      view.btnValider.classList.remove("disabled");
    }
  });

  currentAudio.addEventListener("ended", () => triggerAnswer());

  return {
    triggerAnswer,
    stopAudio: () => {
      currentAudio.pause();
      currentAudio.remove();
    },
  };
}

// Configure les suggestions d'autocomplétion
function setupSuggestions(partie) {
  view.inputResponse.oninput = (e) => {
    const textTaped = e.target.value;
    const suggestions = partie.getSuggestions(textTaped);

    view.suggestionsList.innerHTML = "";

    if (textTaped.length > 1 && suggestions.length > 0) {
      view.suggestionsList.classList.remove("hide");

      suggestions.forEach((titre) => {
        const li = document.createElement("li");
        li.textContent = titre;

        li.onclick = () => {
          view.inputResponse.value = titre;
          view.suggestionsList.classList.add("hide");
          view.suggestionsList.innerHTML = "";
        };

        view.suggestionsList.appendChild(li);
      });
    } else {
      view.suggestionsList.classList.add("hide");
    }
  };
}

// Attache les gestionnaires de clic aux boutons valider, suivant et passer
function setupGameButtons(partie, control) {
  view.btnValider.onclick = () => {
    control.triggerAnswer(view.inputResponse.value ?? "");
  };

  view.btnSuivant.onclick = () => {
    control.stopAudio();
    endRound(partie);
  };

  view.btnSkip.onclick = () => {
    control.stopAudio();
    view.inputResponse.value = "";
    endRound(partie);
  };
}

// Affiche la réponse correcte et annonce le résultat
export function showAnswer(partie, answer) {
  const track = partie.getCurrentTrack();
  const isCorrect = partie.checkAnswer(answer);
  view.response.textContent = `${track.title} - ${track.artist}`;

  if (isCorrect) {
    view.response.textContent += " : Correct !";
    view.response.style.color = "green";
    updateScore(partie);
  } else {
    view.response.textContent += " : Incorrect !";
    view.response.style.color = "red";
  }

  view.timer.textContent = "";
  view.btnSuivant.classList.remove("disabled");
  view.btnSuivant.disabled = false;
  view.btnValider.disabled = true;
  view.btnValider.classList.add("disabled");
  view.cover.style.filter = "blur(0px)";
}

// Passe à la question suivante ou termine le jeu si il n'y en a pas
export function endRound(partie) {
  if (partie.nextTrack()) {
    view.inputResponse.value = "";
    renderQuestion(partie);
  } else {
    endGame(partie.score);
  }
}

// Met à jour le score affiché
export function updateScore(partie) {
  view.score.textContent = `Score: ${partie.score}/${partie.tracks.length}`;
}

// Met à jour le numéro de la piste affichée
export function updateNbTracks(partie) {
  view.nbTracks.textContent = `Musique ${partie.currentTrackIndex + 1}/${partie.tracks.length}`;
}

// Affiche l'alerte du score final et retourne à la sélection de la playlist
export function endGame(finalScore) {
  alert(`Partie terminée ! Votre score final est : ${finalScore}`);
}
