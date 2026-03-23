import { getPlaylistIdFromLink, getPlaylistTracks } from "../api/api.js";
import { displayPlaylistPerso } from "../view/displayPlaylist.js";
import { initPlaylists } from "../main.js";
import persist from "../model/persist.js";

export async function loadDefaultPlaylist(playlistId, playlistData) {
  displayPlaylistPerso(playlistData, playlistId);
}

export async function loadPlaylistPerso(link) {
  const playlistId = await getPlaylistIdFromLink(link);
  // await add persist
  // then display
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
  persist.playlists[playlistId].changeFavorites();
}

export function estFavoris(playlistId){
  return persist.playlists[playlistId].favorite;
}

export async function removePlaylist(playlistId) {}
