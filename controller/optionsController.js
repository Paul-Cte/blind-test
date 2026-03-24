import {
  startOptionsUI,
  hideOptionsUI,
  getOptionsValues,
} from "../view/displayOptions.js";
import { getPlaylistTracks } from "../api/api.js";

/**
 * Affiche les options du jeu pour une playlist donnée
 * @param {string} playlistId - L'ID de la playlist sélectionnée
 */
export async function startOptions(playlistId) {
  const playlistData = await getPlaylistTracks(playlistId);
  startOptionsUI(playlistId, playlistData);
}

/**
 * Récupère les options du jeu sélectionnées et appel la fonction pour masquer l'interface d'options
 * @returns {Object} Options du jeu
 */
export function validateOptions() {
  const options = getOptionsValues();
  hideOptionsUI();
  return options;
}
