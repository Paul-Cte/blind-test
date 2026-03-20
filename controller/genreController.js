import { getPlaylistIdFromLink, getPlaylistTracks } from "../api/api.js";
import { displayPlaylistPerso } from "../view/displayGenres.js";
import { initPlaylists } from "../main.js";

export async function loadDefaultPlaylist(playlistId, index) {
  const playlistData = await getPlaylistTracks(playlistId);
  if (playlistData) {
    displayPlaylistPerso(playlistData, playlistId, index);
  }
}

export async function loadPlaylistPerso(link) {
  const playlistId = await getPlaylistIdFromLink(link);
  if (playlistId) {
    const playlistData = await getPlaylistTracks(playlistId);
    if (playlistData) {
      displayPlaylistPerso(playlistData, playlistId);
    }
  } else {
    initPlaylists();
  }
}
