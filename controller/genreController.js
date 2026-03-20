import { getPlaylistIdFromLink, getPlaylistTracks } from "../api/api.js";
import { displayPlaylistPerso } from "../view/displayPlaylist.js";
import { initPlaylists } from "../main.js";

export async function loadDefaultPlaylist(playlistId, playlistData) {
  displayPlaylistPerso(playlistData, playlistId);
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

export async function changeFavorites(playlistId) {
  const playlistData = await getPlaylistTracks(playlistId);
  playlistData.favorite = !playlistData.favorite;
}

export async function removePlaylist(playlistId) {}
