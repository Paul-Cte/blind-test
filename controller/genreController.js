import { getCategorie } from "../api/api.js";
import { displayGenre } from "../view/displayGenres.js";

export async function loadGenre(id, index) {
  const genre = await getCategorie(id);
  displayGenre(genre, index);
}
