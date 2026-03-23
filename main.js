import { loadDefaultPlaylist } from "./controller/genreController.js";
import { view } from "./view/view.js";
import { displayAddPlaylist } from "./view/displayPlaylist.js";
import persist from "./model/persist.js";

// Affichage des playlists
export async function initPlaylists() {
  // On efface ce qui est déjà affiché
  view.interfaceSelection.innerHTML = "";
  // Si il n'y a aucune playlist, on propose à l'utilisateur d'en ajouter
  if (Object.keys(persist.playlists).length === 0){
    displayAddPlaylist();
  }
  // Sinon on les affiche toutes une par une depuis l'objet persist.playlists
  else{
    for (const [playlistId, playlistData] of Object.entries(persist.playlists)){
        await loadDefaultPlaylist(playlistId, playlistData);
    };
  }
}

// Affichage des playlists après chargement
await persist.build().then(async () => {
  initPlaylists();
});
