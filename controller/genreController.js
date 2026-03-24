import { getPlaylistIdFromLink, getPlaylistTracks } from "../api/api.js";
import { displayPlaylistPerso } from "../view/displayPlaylist.js";
import persist from "../model/persist.js";

// Charge et affiche une playlist par défaut
export async function loadDefaultPlaylist(playlistId, playlistData, recherche) {
  displayPlaylistPerso(playlistData, playlistId, recherche);
}

// Charge une playlist personnalisée à partir d'un lien Deezer
export async function loadPlaylistPerso(link) {
  const playlistId = await getPlaylistIdFromLink(link);
  if (playlistId) {
    const playlistData = await persist.add(playlistId);
    displayPlaylistPerso(playlistData, playlistId, "");
  }
}

// Bascule le statut de favori pour une playlist
export async function changeFavorites(playlistId) {
  persist.playlists[playlistId].changeFavorites();
}

// Vérifie si une playlist est marquée comme favorite
export function estFavoris(playlistId) {
  return persist.playlists[playlistId].favorite;
}

// Supprime une playlist de la collection
export async function removePlaylist(playlistId) {}
