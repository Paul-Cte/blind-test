export class Game {
  constructor(tracks) {
    this.tracks = tracks;
    this.score = 0;
    this.currentTrackIndex = 0;
    // Mélanger les musiques
    this.tracks.sort(() => Math.random() - 0.5);
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  checkAnswer(answer) {
    // a changer selon le nom du champ titre
    const isCorrect =
      answer.toLowerCase() === this.getCurrentTrack().title.toLowerCase();
    if (isCorrect) this.score++;
    return isCorrect;
  }

  nextTrack() {
    this.currentTrackIndex++;
    return this.currentTrackIndex < this.tracks.length; // Retourne false si la partie est finie
  }
}
