import { getPlaylistIdFromLink, getPlaylistTracks } from "../api/api.js";
import { displayPlaylistPerso } from "../view/displayPlaylist.js";
import { initPlaylists } from "../main.js";
import persist from "../model/persist.js";

export async function loadDefaultPlaylist(playlistId, playlistData, recherche) {
  displayPlaylistPerso(playlistData, playlistId, recherche);
}

export async function loadPlaylistPerso(link) {
  const playlistId = await getPlaylistIdFromLink(link);
  if (playlistId) {
    const playlistData = await persist.add(playlistId);
    displayPlaylistPerso(playlistData, playlistId, recherche);
  }
}

export async function changeFavorites(playlistId) {
  persist.playlists[playlistId].changeFavorites();
}

export function estFavoris(playlistId){
  return persist.playlists[playlistId].favorite;
}

export async function removePlaylist(playlistId) {}
