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