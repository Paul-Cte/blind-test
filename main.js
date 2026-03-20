import { loadDefaultPlaylist } from "./controller/genreController.js";
import { view } from "./view/view.js";

export const defaultPlaylists = {
  "Rap/Hip Hop": 1071669561,
  "Chanson française": 700895155,
  Classique: 747148961,
  "Films/Jeux vidéo": 1602126835,
  Metal: 1050179021,
};

export async function initPlaylists() {
  view.container.innerHTML = "";
  const playlistIds = Object.values(defaultPlaylists);

  for (let index = 0; index < playlistIds.length; index++) {
    await loadDefaultPlaylist(playlistIds[index], index);
  }
}

initPlaylists();
