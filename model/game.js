export class Game {
  constructor(tracks, options) {
    this.Alltracks = tracks;
    this.score = 0;
    this.currentTrackIndex = 0;
    this.guessTime = options.guessTime;
    // Mélanger les musiques
    this.tracks = this.Alltracks.sort(() => Math.random() - 0.5).slice(0, 10);
  }

  getSuggestions(inputText) {
    if (!inputText) return [];
    const cleanInput = inputText.toLowerCase();
    const uniqueTitles = new Set();
    let limitReached = false;
    for (let i = 0; i < this.Alltracks.length && !limitReached; i++) {
      const track = this.Alltracks[i];
      const cleanTitle = track.title.toLowerCase();
      // Limite à 5 suggestions
      if (cleanTitle.toLowerCase().includes(cleanInput)) {
        uniqueTitles.add(track.title);
      }
      if (uniqueTitles.size >= 5) {
        limitReached = true;
      }
    }
    return [...uniqueTitles];
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  checkAnswer(answer) {
    // a changer selon le nom du champ titre
    const isCorrect =
      answer.toLowerCase().replace(/\(.*?\)/g, "") ===
      this.getCurrentTrack()
        .title.toLowerCase()
        .replace(/\(.*?\)/g, ""); // je vire tout ce qui entre paranthese pour éviter les problèmes de featuring, remix, etc
    if (isCorrect) this.score++;
    return isCorrect;
  }

  nextTrack() {
    this.currentTrackIndex++;
    return this.currentTrackIndex < this.tracks.length; // Retourne false si la partie est finie
  }
}
