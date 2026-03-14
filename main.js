// blind-test/main.js
import { loadGenre } from "./controller/genreController.js";

let idGenres = {
  "Rap/Hip Hop": { genreId: 116, playlistId: 1071669561 },
  "Chanson française": { genreId: 52, playlistId: 700895155 },
  Classique: { genreId: 98, playlistId: 747148961 },
  "Films/Jeux vidéo": { genreId: 173, playlistId: 1602126835 },
  Metal: { genreId: 464, playlistId: 1050179021 },
};

async function initGenres() {
  const genresArray = Object.values(idGenres);

  for (let index = 0; index < genresArray.length; index++) {
    const element = genresArray[index];
    // on attends que le genre soit chargé pour garder le même ordre
    await loadGenre(element, index);
  }
}

initGenres();
