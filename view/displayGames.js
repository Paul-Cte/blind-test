import { view } from "./view.js";

let currentAudio = null;

export function startGameUI(partie, title) {
  view.interfacePartie.classList.remove("hide");
  view.playlistTitle.textContent = title;
  renderQuestion(partie);
}

export function renderQuestion(partie) {
  const track = partie.getCurrentTrack();
  console.log("Piste actuelle :", track.title);

  // Réinitialiser et préparer l'interface visuelle
  setupQuestionUI(partie, track);

  // Lancer la musique et gérer le chronomètre
  // On récupère un objet de contrôle pour gérer les réponses
  const control = manageAudioAndTimer(partie, track);

  // Gérer l'autocomplétion de la barre de recherche
  setupSuggestions(partie);

  // Assigner les actions aux boutons (Valider, Suivant, Skip)
  setupGameButtons(partie, control);
}

function setupQuestionUI(partie, track) {
  view.response.textContent = "";
  view.cover.src = track.cover;
  view.cover.style.filter = "blur(50px)";
  view.timer.textContent = partie.guessTime;

  // Désactivation des boutons en début de manche
  view.btnSuivant.classList.add("disabled");
  view.btnSuivant.disabled = true;
  view.btnValider.disabled = true;
  view.btnValider.classList.add("disabled");

  updateScore(partie);
  updateNbTracks(partie);
}

function manageAudioAndTimer(partie, track) {
  // Nettoyer l'audio précédent s'il y en a un
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.remove();
  }

  currentAudio = document.createElement("audio");
  currentAudio.src = track.preview;
  currentAudio.autoplay = true;
  view.player.appendChild(currentAudio);

  let hasAnswered = false;

  // Fonction interne appelée quand le temps est écoulé ou validé manuellement
  const triggerAnswer = (manualAnswer = null) => {
    if (hasAnswered) return;
    hasAnswered = true;
    currentAudio.pause();
    view.timer.textContent = "";

    // Si la réponse n'est pas manuelle, on prend ce qu'il y a dans l'input
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
      // Activer le bouton valider dès que la musique tourne
      view.btnValider.disabled = false;
      view.btnValider.classList.remove("disabled");
    }
  });

  currentAudio.addEventListener("ended", () => triggerAnswer());

  // On retourne de quoi contrôler manuellement la validation depuis les boutons
  return {
    triggerAnswer,
    stopAudio: () => {
      currentAudio.pause();
      currentAudio.remove();
    },
  };
}

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

export function showAnswer(partie, answer) {
  const track = partie.getCurrentTrack();
  const isCorrect = partie.checkAnswer(answer);
  view.response.textContent = `${track.title} - ${track.artist}`;
  if (isCorrect) {
    view.response.textContent += " : Bonne réponse !";
    view.response.style.color = "green";
    updateScore(partie);
  } else {
    view.response.textContent += " : Mauvaise réponse !";
    view.response.style.color = "red";
  }
  view.timer.textContent = "";
  view.btnSuivant.classList.remove("disabled");
  view.btnSuivant.disabled = false;
  view.btnValider.disabled = true;
  view.btnValider.classList.add("disabled");
  view.cover.style.filter = "blur(0px)";
}

export function endRound(partie) {
  if (partie.nextTrack()) {
    view.inputResponse.value = "";
    renderQuestion(partie);
  } else {
    endGame(partie.score);
  }
}

export function updateScore(partie) {
  view.score.textContent = `Score: ${partie.score}/${partie.tracks.length}`;
}

export function updateNbTracks(partie) {
  view.nbTracks.textContent = `Musique ${partie.currentTrackIndex + 1}/${partie.tracks.length}`;
}

export function endGame(finalScore) {
  alert(`Partie terminée ! Votre score final est : ${finalScore}`);
}
