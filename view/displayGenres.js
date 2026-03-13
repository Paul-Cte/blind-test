export function displayGenre(genre, index) {
  const container = document.querySelector("#body-selection");

  const figure = document.createElement("figure");
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

export function debutPartie(genre) {
  const container = document.querySelector("#interface-selection");
  const jeu = document.querySelector("#interface-partie");
  container.style.display = "none";
  jeu.style.display = "block";
}
