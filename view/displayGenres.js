import { view } from "./view.js";

export function displayGenre(genre, index, playlistId) {
  const figure = document.createElement("figure");
  figure.dataset.playlist = playlistId;
  const img = document.createElement("img");
  img.src = genre.picture_big;
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = genre.name;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  if (index === 0) {
    figure.classList.add("active");
  }

  view.container.appendChild(figure);
}

export function displayPlaylistPerso(genre, playlistId) {
  view.container.innerHTML = ""; // Clear existing genres
  const figure = document.createElement("figure");
  figure.dataset.playlist = playlistId;
  const img = document.createElement("img");
  img.src = genre.picture_big;
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = genre.title;
  figure.classList.add("active");
  figure.appendChild(img);
  figure.appendChild(figcaption);
  view.container.appendChild(figure);
}
