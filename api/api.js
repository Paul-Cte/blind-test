import { initPlaylists } from "../main.js";
import { Playlist } from "../model/playlist.js";

export async function getPlaylistTracks(playlistId) {
  if (!playlistId || playlistId === "undefined") {
    console.error("Erreur : L'ID de la playlist est manquant !");
    return null;
  }

  try {
    const targetUrl = `https://api.deezer.com/playlist/${playlistId}`;
    const myVercelProxy = "https://proxy-blind-test.vercel.app/api/deezer";
    const proxyUrl = `${myVercelProxy}?url=${encodeURIComponent(targetUrl)}`;

    const response = await fetch(proxyUrl);
    const data = await response.json();

    if (data.error) {
      console.error("Erreur renvoyée par Deezer :", data.error);
      return null;
    }
    return new Playlist(data);
  } catch (error) {
    console.error("Erreur avec l'API ou le proxy :", error);
    return null;
  }
}

export async function getPlaylistIdFromLink(link) {
  // CAS 1 : C'est déjà un lien long classique (ex: www.deezer.com/fr/playlist/12345)
  if (link.includes("playlist/")) {
    return link.split("playlist/")[1].split("?")[0];
  }

  // CAS 2 : C'est un lien court de partage (ex: link.deezer.com/s/...)
  if (link.includes("link.deezer.com")) {
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(link)}`;
      const response = await fetch(proxyUrl);
      const htmlText = await response.text();
      const match = htmlText.match(/playlist\/(\d+)/);

      if (match && match[1]) {
        return match[1];
      } else {
        console.error("Impossible de trouver l'ID dans la page Deezer.");
        alert(
          "Lien Deezer non reconnu. Veuillez vérifier le lien et réessayer.",
        );
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la lecture du lien court :", error);
      alert("Lien Deezer non reconnu. Veuillez vérifier le lien et réessayer.");
      initPlaylists();
      return null;
    }
  }

  console.error("Lien Deezer non reconnu.");
  return null;
}
