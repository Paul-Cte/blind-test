export function displayGenre(genre, index, playlistId) {
  const container = document.querySelector("#body-selection");

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

  container.appendChild(figure);
}
