import { loadDefaultPlaylist } from "./controller/genreController.js";
import { view } from "./view/view.js";
import persist from "./model/persist.js";


// LOAD DEPUIS LA LOCALSTORAGE

export async function initPlaylists() {
  view.interfaceSelection.innerHTML = "";
  for (const [playlistId, playlistData] of Object.entries(persist.playlists)){
      await loadDefaultPlaylist(playlistId, playlistData);
  };
}

await persist.build().then(async () => {
  initPlaylists();
});
