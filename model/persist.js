export class Persist{
    constructor(playlists){
        this.playlists = playlists;
    }

    getFavorites() {
        const favorites = [];
        this.playlists.forEach(element => {
            if (element.favorite) favorites.push(element);
        });
        return favorites;
    }

    remove(playlistId){
        this.playlists.forEach(element => {
            if (element.playlistId === playlistId){
                this.playlists.splice(this.playlists.indexOf(element));
                saveToLocalStorage();
                return;
            }
        });
        alert("Erreur : n'existe pas dans la liste playlist");
    }

    saveToLocalStorage(){
        localStorage.setItem("playlists", JSON.stringify(this));
    }
}
