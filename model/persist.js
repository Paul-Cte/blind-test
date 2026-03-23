let instance;
import {getPlaylistTracks} from "../api/api.js";
import { Playlist } from "./playlist.js";


class Persist{
    
    constructor(){
        // Pattern singleton
        if (instance){
            throw new Error("ERREUR DOUBLE INSTANCE");
        }
        this.playlists = {};
    }

    async build(){
        // On lit le local storage
        const storage = localStorage.getItem("playlists");
        // Chargement des données (ou ajout de données par défaut si il n'y en a pas)
        if (storage){
            this.loadStorage(storage);
        } else {
            await this.add(1071669561);
            await this.add(700895155);
            await this.add(747148961);
            await this.add(1602126835);
            await this.add(1050179021);
        }
    }

    // Pattern singleton
    getInstance(){
        return this;
    }

    // Renvoie une liste de playlist qui sont les éléments de playlists qui sont favoris
    getFavorites() {
        const favorites = [];
        Object.values(this.playlists).forEach(element => {
            if (element.favorite) favorites.push(element);
        });
        return favorites;
    }
    
    // Ajoute une playlist à l'objet playlists
    async add(playlistId){
        // Récupération de la playlist
        const newPlaylist = await getPlaylistTracks(playlistId);
        if (newPlaylist){
            // Ajout et sauvegarde dans le localstorage
            this.playlists[playlistId] = newPlaylist;
            localStorage.setItem("playlists", JSON.stringify(this));

            // Renvoi pour l'affichage
            return newPlaylist;
        }
        else{
            throw new Error("Erreur : playlist n'existe pas");
        }
    }

    // Retire une playlist de l'objet playlists
    remove(playlistId){
        delete this.playlists[playlistId];
        this.saveToLocalStorage();
    }

  // Sauvegarde l'objet dans le localstorage
  saveToLocalStorage() {
    localStorage.setItem("playlists", JSON.stringify(this));
  }

  // Remet l'objet dans le même état que celui sauvegardé dans le localstorage
  loadStorage(storage){
    const data = JSON.parse(storage);
    this.playlists = {};
    Object.values(data.playlists).forEach(p => {
        this.playlists[p.id] = Playlist.loadStorage(p);
    });
  }
}

// Pattern singleton
const persist = new Persist();
export default persist;
