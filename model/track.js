// Représente une chanson
export class Track {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.artist = data.artist.name;
    this.preview = data.preview;
    this.cover = data.album.cover_big;
  }
}
