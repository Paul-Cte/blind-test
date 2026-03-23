import { Track } from "./track.js";
import persist from "./persist.js";

export class Playlist {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.cover = data.picture_big;
    this.tracks = data.tracks.data.map((trackData) => new Track(trackData));
    this.favorite = false;
  }

  // Remet l'objet dans le même état que les données fournies
  static loadStorage(data){
    // On créé un objet Playlist en assignant à chaque attribut la valeur d'un attribut de l'objet data
    const playlist = Object.assign(new Playlist({ 
        id: data.id, title: data.title, picture_big: data.cover,
        tracks: { data: [] }
    }), data);
    // Idem pour créer chacune des tracks de l'objet
    playlist.tracks = data.tracks.map(t => Object.assign(new Track({ 
        id: t.id, title: t.title, preview: t.preview,
        artist: { name: t.artist }, album: { cover_big: t.cover }
    }), t));
    return playlist;
  }

  // Ajoute ou retire le favoris
  changeFavorites(){
    this.favorite = !this.favorite;
    persist.saveToLocalStorage();
  }
}
