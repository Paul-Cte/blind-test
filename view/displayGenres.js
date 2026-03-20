import { view } from "./view.js";

export function displayPlaylistPerso(playlistData, playlistId, index) {
  const figure = document.createElement("figure");
  figure.dataset.playlist = playlistId;
  figure.dataset.genre = "custom";
  const img = document.createElement("img");
  img.draggable = false;
  img.src = playlistData.cover;
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = playlistData.title;
  if (index === 0) figure.classList.add("active");

  figure.appendChild(img);
  figure.appendChild(figcaption);
  view.container.appendChild(figure);
}
