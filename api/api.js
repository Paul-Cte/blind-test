async function getCategorie(genreId) {
    try {
        const response = await fetch(`https://api.deezer.com/genre/${genreId}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}