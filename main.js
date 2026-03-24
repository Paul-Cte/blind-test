import { loadDefaultPlaylist } from "./controller/genreController.js";
import { view } from "./view/view.js";
import {
  displayAddPlaylist,
  displayPlaylistPerso,
} from "./view/displayPlaylist.js";
import persist from "./model/persist.js";

// Affichage des playlists
export async function initPlaylists(recherche = "") {
  view.container.innerHTML = "";
  if (view.containerFavorites) view.containerFavorites.innerHTML = "";

  if (Object.keys(persist.playlists).length === 0) {
    displayAddPlaylist();
  } else {
    for (const [playlistId, playlistData] of Object.entries(
      persist.playlists,
    )) {
      await loadDefaultPlaylist(playlistId, playlistData, recherche);
    }

    const favoris = persist.getFavorites();
    favoris.forEach((playlist) => {
      displayPlaylistPerso(playlist, playlist.id, recherche, view.containerFavorites);
    });
  }
}

// Affichage des playlists après chargement
await persist.build().then(async () => {
  initPlaylists();
});
