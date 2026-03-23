let instance;
import {getPlaylistTracks} from "../api/api.js";
import { Playlist } from "./playlist.js";


class Persist{
    
    constructor(){
        if (instance){
            throw new Error("ERREUR DOUBLE INSTANCE");
        }
        this.playlists = {};
    }

    async build(){
        const storage = localStorage.getItem("playlists");
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

    getInstance(){
        return this;
    }

    getFavorites() {
        const favorites = [];
        Object.values(this.playlists).forEach(element => {
            if (element.favorite) favorites.push(element);
        });
        return favorites;
    }
    
    async add(playlistId){
        const newPlaylist = await getPlaylistTracks(playlistId);
        if (newPlaylist){
            this.playlists[playlistId] = newPlaylist;
            localStorage.setItem("playlists", JSON.stringify(this));
            return newPlaylist;
        }
        else{
            throw new Error("Erreur : playlist n'existe pas");
        }
    }

    remove(playlistId){
        // Object.values(this.playlists).forEach(element => {
        //     alert(element.id);
        //     if (element.id == playlistId){
        //         alert("a");
        //         delete this.playlists.playlistId;
        //         this.saveToLocalStorage();
        //         return true;
        //     }
        // });
        // alert(playlistId)
        // alert("Erreur : n'existe pas dans la liste playlist");
        delete this.playlists[playlistId];
        this.saveToLocalStorage();
    }

  saveToLocalStorage() {
    localStorage.setItem("playlists", JSON.stringify(this));
  }

  loadStorage(storage){
    const data = JSON.parse(storage);
    this.playlists = {};
    Object.values(data.playlists).forEach(p => {
        this.playlists[p.id] = Playlist.loadStorage(p);
    });
  }
}

const persist = new Persist();
export default persist;
