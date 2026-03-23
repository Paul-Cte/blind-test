import { loadDefaultPlaylist } from "./controller/genreController.js";
import { view } from "./view/view.js";
import { displayAddPlaylist } from "./view/displayPlaylist.js";
import persist from "./model/persist.js";


// LOAD DEPUIS LA LOCALSTORAGE

export async function initPlaylists() {
  view.interfaceSelection.innerHTML = "";
  if (Object.keys(persist.playlists).length === 0){
    displayAddPlaylist();
  }
  else{
    for (const [playlistId, playlistData] of Object.entries(persist.playlists)){
        await loadDefaultPlaylist(playlistId, playlistData);
    };
  }
}

await persist.build().then(async () => {
  initPlaylists();
});
