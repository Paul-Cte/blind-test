import { loadGenre } from "./controller/genreController.js";
let idGenres = {
  "Rap/Hip Hop": 116,
  "Chanson française": 52,
  Classique: 98,
  "Films/Jeux vidéo": 173,
  Metal: 464,
};
Object.values(idGenres).forEach((element, index) => {
  loadGenre(element, index);
});
