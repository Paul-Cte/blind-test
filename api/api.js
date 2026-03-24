import { initPlaylists } from "../main.js";
import { Playlist } from "../model/playlist.js";

/**
 * Récupère les données de la playlist depuis l'API Deezer via proxy
 * @param {string} playlistId - L'ID de la playlist Deezer
 * @returns {null} - retourne null en cas d'erreurs
 */
export async function getPlaylistTracks(playlistId) {
  if (!playlistId || playlistId === "undefined") {
    console.error("Erreur : L'ID de la playlist est manquant");
    return null;
  }

  try {
    const targetUrl = `https://api.deezer.com/playlist/${playlistId}`;
    const myVercelProxy = "https://proxy-blind-test.vercel.app/api/deezer";
    const proxyUrl = `${myVercelProxy}?url=${encodeURIComponent(targetUrl)}`;

    const response = await fetch(proxyUrl);
    const data = await response.json();

    if (data.error) {
      console.error("Erreur API Deezer :", data.error);
      return null;
    }
    return new Playlist(data);
  } catch (error) {
    console.error("Erreur API ou proxy :", error);
    return null;
  }
}

/**
 * Extrait l'ID de la playlist à partir de différents formats de lien Deezer
 * @param {string} link - Le lien de la playlist Deezer
 * @returns {Promise<string|null>} L'ID de la playlist ou null en cas d'erreur
 */
export async function getPlaylistIdFromLink(link) {
  // Format de lien Deezer standard
  if (link.includes("playlist/")) {
    return link.split("playlist/")[1].split("?")[0];
  }

  // Format de lien court Deezer
  if (link.includes("link.deezer.com")) {
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(link)}`;
      const response = await fetch(proxyUrl);
      const htmlText = await response.text();
      const match = htmlText.match(/playlist\/(\d+)/);

      if (match && match[1]) {
        return match[1];
      } else {
        console.error(
          "Impossible d'extraire l'ID de la playlist de la page Deezer",
        );
        alert("Lien Deezer invalide. Veuillez vérifier et réessayer.");
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la résolution du lien court :", error);
      alert("Lien Deezer invalide. Veuillez vérifier et réessayer.");
      initPlaylists();
      return null;
    }
  }

  console.error("Format de lien Deezer non reconnu");
  return null;
}
