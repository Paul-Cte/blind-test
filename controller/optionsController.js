import {
  startOptionsUI,
  hideOptionsUI,
  getOptionsValues,
} from "../view/displayOptions.js";
import { getPlaylistTracks } from "../api/api.js";

export async function startOptions(playlistId) {
  const playlistData = await getPlaylistTracks(playlistId);
  startOptionsUI(playlistId, playlistData);
}

export function validateOptions() {
  const options = getOptionsValues();
  hideOptionsUI();
  return options;
}
