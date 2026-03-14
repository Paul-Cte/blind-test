import { getCategorie } from "../api/api.js";
import { displayGenre } from "../view/displayGenres.js";

export async function loadGenre(genreData, index) {
  const genre = await getCategorie(genreData.genreId);
  displayGenre(genre, index, genreData.playlistId);
}
