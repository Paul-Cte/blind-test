import { loadDefaultPlaylist } from "./controller/genreController.js";
import { view } from "./view/view.js";
import persist from "./model/persist.js";


export async function initPlaylists() {

  await persist.build().then(async () => {
    for (const [playlistId, playlistData] of Object.entries(persist.playlists)){
      await loadDefaultPlaylist(playlistId, playlistData);
    }
  });
}

initPlaylists();
