import {
  getCategorie,
  getPlaylistIdFromLink,
  getPlaylistTracks,
} from "../api/api.js";
import { displayGenre, displayPlaylistPerso } from "../view/displayGenres.js";
import { initGenres } from "../main.js";

export async function loadGenre(genreData, index) {
  const genre = await getCategorie(genreData.genreId);
  displayGenre(genre, index, genreData.playlistId);
}

export async function loadPlaylistPerso(link) {
  const playlistId = await getPlaylistIdFromLink(link);
  if (playlistId) {
    const playlistData = await getPlaylistTracks(playlistId);
    displayPlaylistPerso(playlistData, playlistId);
  } else {
    initGenres();
  }
}

export async function changeFavorites(playlistId){
  const playlistData = await getPlaylistTracks(playlistId);
  playlistData.favorite = !playlistData.favorite;
}

export async function removePlaylist(playlistId){
  
}
