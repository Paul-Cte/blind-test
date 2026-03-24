let instance;
import { getPlaylistTracks } from "../api/api.js";
import { Playlist } from "./playlist.js";

// Représente la liste de playlists de l'application (pattern singleton)
class Persist {
  constructor() {
    if (instance) {
      throw new Error(
        "Persist est un singleton - une seule instance autorisée",
      );
    }
    this.playlists = {};
  }

  // Initialisation depuis le localStorage ou chargement des playlist par défaut
  async build() {
    const storage = localStorage.getItem("playlists");
    if (storage) {
      this.loadStorage(storage);
    } else {
      // Charge les playlists par défaut
      await this.add(1071669561);
      await this.add(700895155);
      await this.add(747148961);
      await this.add(1602126835);
      await this.add(1050179021);
    }
  }

  // Renvoie la liste des playlist en favoris
  getFavorites() {
    const favorites = [];
    Object.values(this.playlists).forEach((element) => {
      if (element.favorite) favorites.push(element);
    });
    return favorites;
  }

  // Ajoute une playlist (et sauvegarde le localStorage)
  // Affiche une erreur si la playlist ne charge pas
  async add(playlistId) {
    const newPlaylist = await getPlaylistTracks(playlistId);
    if (newPlaylist) {
      this.playlists[playlistId] = newPlaylist;
      localStorage.setItem("playlists", JSON.stringify(this));
      return newPlaylist;
    }
    throw new Error("La playlist n'existe pas ou n'a pas pu être chargée");
  }

  // Supprime une playlist (et sauvegade le localStorage)
  remove(playlistId) {
    delete this.playlists[playlistId];
    this.saveToLocalStorage();
  }

  // Sauvegarde l'état actuel des playlists dans le localstorage
  saveToLocalStorage() {
    localStorage.setItem("playlists", JSON.stringify(this));
  }

  // Charge les playlists sauvegardée dans le localstorage
  loadStorage(storage) {
    const data = JSON.parse(storage);
    this.playlists = {};
    Object.values(data.playlists).forEach((p) => {
      this.playlists[p.id] = Playlist.loadStorage(p);
    });
  }
}

// Pattern singleton
const persist = new Persist();
export default persist;
