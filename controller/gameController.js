import { getPlaylistTracks } from "../api/api.js";
import { Game } from "../model/game.js";
import { startGameUI } from "../view/displayGames.js";

export async function startGame(playlistId) {
  const data = await getPlaylistTracks(playlistId);
  const partie = new Game(data.tracks.data);
  startGameUI(partie, data.title);
}
