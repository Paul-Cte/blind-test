/**
 * Gère l'état et la logique du jeu du blind test
 */
export class Game {
  /**
   * Crée une nouvelle session de jeu avec des pistes mélangées
   * @param {Track[]} tracks - Pistes disponibles à jouer
   * @param {Object} options - Options du jeu
   * @param {number} options.guessTime - Temps en secondes pour deviner chaque piste
   */
  constructor(tracks, options) {
    this.Alltracks = tracks;
    this.score = 0;
    this.currentTrackIndex = 0;
    this.guessTime = options.guessTime;
    // Mélange et sélectionne 10 pistes aléatoires à jouer
    this.tracks = this.Alltracks.sort(() => Math.random() - 0.5).slice(0, 10);
  }

  /**
   * Retourne jusqu'à 5 suggestions de pistes correspondant au texte saisi
   * @param {string} inputText - Texte saisi par l'utilisateur
   * @returns {string[]} Tableau des titres de pistes correspondants
   */
  getSuggestions(inputText) {
    if (!inputText) return [];
    const cleanInput = inputText.toLowerCase();
    const uniqueTitles = new Set();
    let limitReached = false;
    for (let i = 0; i < this.Alltracks.length && !limitReached; i++) {
      const track = this.Alltracks[i];
      const cleanTitle = track.title.toLowerCase();
      if (cleanTitle.includes(cleanInput)) {
        uniqueTitles.add(track.title);
      }
      if (uniqueTitles.size >= 5) {
        limitReached = true;
      }
    }
    return [...uniqueTitles];
  }

  /** @returns {Track} La piste actuelle */
  getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  /**
   * Vérifie la réponse de l'utilisateur
   * @param {string} answer - Réponse de l'utilisateur
   * @returns {boolean}- true si correct
   */
  checkAnswer(answer) {
    const normalizeTitle = (title) =>
      title.toLowerCase().replace(/\(.*?\)/g, "");
    const isCorrect =
      normalizeTitle(answer) === normalizeTitle(this.getCurrentTrack().title);
    if (isCorrect) this.score++;
    return isCorrect;
  }

  /**
   * Passe à la piste suivante
   * @returns {boolean} - false si jeu terminé
   */
  nextTrack() {
    this.currentTrackIndex++;
    return this.currentTrackIndex < this.tracks.length;
  }
}
