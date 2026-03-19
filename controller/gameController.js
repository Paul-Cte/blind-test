import { getPlaylistTracks } from "../api/api.js";
import { Game } from "../model/game.js";
import { startGameUI } from "../view/displayGames.js";

export async function startGame(options) {
  const data = await getPlaylistTracks(options.playlistId);
  const partie = new Game(data.tracks.data, options);
  startGameUI(partie, data.title);
}
