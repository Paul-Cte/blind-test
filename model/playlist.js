import { Track } from "./track.js";

export class Playlist {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.cover = data.picture_big;
    this.tracks = data.tracks.data.map((trackData) => new Track(trackData));
    this.favorite = false;
  }
}
