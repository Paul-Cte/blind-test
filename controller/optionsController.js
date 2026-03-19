/*import { startOptionsUI } from "../view/displayOptions.js";
import { getCategorie } from "../api/api.js";

export async function startOptions(genreId, playlistId) {
  const genre = await getCategorie(genreId);
  startOptionsUI(playlistId, genre);
}
*/

import { startOptionsUI, hideOptionsUI, getOptionsValues } from "../view/displayOptions.js";
import { getCategorie } from "../api/api.js";

export async function startOptions(genreId, playlistId) {
  const genre = await getCategorie(genreId);
  startOptionsUI(playlistId, genre);
}

export function validateOptions() {
  const options = getOptionsValues();
  hideOptionsUI();
  return options; // { guessTime, songTime, playlistId } — à brancher sur startGame quand besoin
}