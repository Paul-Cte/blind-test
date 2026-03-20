import { getPlaylistTracks } from "../api/api.js";
import { Game } from "../model/game.js";
import { startGameUI } from "../view/displayGames.js";

export async function startGame(options) {
  const playlist = await getPlaylistTracks(options.playlistId);
  const partie = new Game(playlist.tracks, options);
  startGameUI(partie, playlist.title);
}
