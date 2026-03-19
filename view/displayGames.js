import { view } from "./view.js";

export function startGameUI(partie, title) {
  view.interfacePartie.classList.remove("hide");
  view.playlistTitle.textContent = title;
  renderQuestion(partie);
}

export function renderQuestion(partie) {
  let track = partie.getCurrentTrack();
  console.log(track.title); // pour tester les réponses
  view.response.textContent = "";
  view.cover.src = track.album.cover_big;
  view.cover.style.filter = "blur(50px)";

  view.timer.textContent = partie.guessTime;

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

  // affichage score et nb de musique
  updateScore(partie);
  updateNbTracks(partie);

  let hasAnswered = false;
  let answer = "";

  audio.addEventListener("timeupdate", () => {
    if (hasAnswered) {
      return;
    }
    view.timer.textContent = partie.guessTime - Math.floor(audio.currentTime);

    if (audio.currentTime >= partie.guessTime) {
      hasAnswered = true;
      audio.pause();
      view.timer.textContent = "";
      answer = view.inputResponse.value ?? "";
      showAnswer(partie, answer);
    } else {
      view.btnValider.disabled = false;
      view.btnValider.classList.remove("disabled");
    }
  });

  audio.addEventListener("ended", () => {
    if (hasAnswered) return;

    hasAnswered = true;
    view.timer.textContent = "";
    answer = view.inputResponse.value ?? "";
    showAnswer(partie, answer);
  });

  // --- GESTION DES SUGGESTIONS ---
  view.inputResponse.oninput = (e) => {
    const textTaped = e.target.value;
    const suggestions = partie.getSuggestions(textTaped);

    view.suggestionsList.innerHTML = ""; // On vide l'ancienne liste

    // Si on a tapé au moins 2 lettres et qu'il y a des résultats
    if (textTaped.length > 1 && suggestions.length > 0) {
      view.suggestionsList.classList.remove("hide");

      suggestions.forEach((titre) => {
        const li = document.createElement("li");
        li.textContent = titre;

        // Si le joueur clique sur une suggestion
        li.onclick = () => {
          view.inputResponse.value = titre; // Remplir l'input
          view.suggestionsList.classList.add("hide"); // Cacher la liste
          view.suggestionsList.innerHTML = "";
        };

        view.suggestionsList.appendChild(li);
      });
    } else {
      view.suggestionsList.classList.add("hide");
    }
  };

  // clique sur le bouton valider
  view.btnValider.onclick = () => {
    // Paul qui dit ça pas ia : ici j'ai mis onclick car ça permet de ne pas surcharger le nombre dévenement et d'éviter les bugs
    hasAnswered = true;
    audio.pause();
    answer = view.inputResponse.value ?? "";
    showAnswer(partie, answer);
  };

  //clique sur le bouton suivant
  view.btnSuivant.onclick = () => {
    // Paul qui dit ça pas ia : ici j'ai mis onclick car ça permet de ne pas surcharger le nombre dévenement et d'éviter les bugs
    audio.pause();
    audio.remove();
    endRound(partie);
  };

  view.btnSkip.onclick = () => {
    audio.pause();
    audio.remove();
    view.inputResponse.value = "";
    endRound(partie);
  };
}

export function showAnswer(partie, answer) {
  const track = partie.getCurrentTrack();
  const isCorrect = partie.checkAnswer(answer);
  view.response.textContent = `${track.title} - ${track.artist.name}`;
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
