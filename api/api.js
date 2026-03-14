export async function getCategorie(genreId) {
  try {
    const targetUrl = `https://api.deezer.com/genre/${genreId}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur avec l'API ou le proxy :", error);
  }
}

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
    return data;
  } catch (error) {
    console.error("Erreur avec l'API ou le proxy :", error);
    return null;
  }
}
