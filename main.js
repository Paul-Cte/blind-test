import { loadGenre } from "./controller/genreController.js";
let idGenres = {
    "Rap" : 116,
    "Metal" : 464,
    "Jazz" : 129,
    "Films/Jeux vidéo" : 173
}
Object.values(idGenres).forEach((element) => {
    loadGenre(element);
});
