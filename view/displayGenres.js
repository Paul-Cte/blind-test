import { view } from "./view.js";
import { initGenres } from "../main.js";

export function displayGenre(genre, index, playlistId) {
  view.btnRetour.classList.add("hide");

  const figure = document.createElement("figure");
  figure.dataset.playlist = playlistId;
  figure.dataset.genre = genre.id;
  const img = document.createElement("img");
  img.src = genre.picture_big;
  img.draggable = false;

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = genre.name;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  if (index === 0) {
    figure.classList.add("active");
  }

  view.container.appendChild(figure);
}

export function displayPlaylistPerso(playlistData, playlistId) {
  view.container.innerHTML = ""; // Clear existing genres
  const figure = document.createElement("figure");
  figure.dataset.playlist = playlistId;
  figure.dataset.genre = genre.id;
  const img = document.createElement("img");
  img.draggable = false;
  img.src = playlistData.cover;
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = playlistData.title;
  figure.classList.add("active");
  figure.appendChild(img);
  figure.appendChild(figcaption);
  view.btnRetour.classList.remove("hide");
  view.btnRetour.addEventListener("click", () => {
    view.container.innerHTML = "";
    initGenres();
  });
  view.container.appendChild(figure);
}
