export function displayGenre(genre) {
    const container = document.querySelector("#body-selection");

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.href = genre.picture_big;
    const figcaption = document.createElement("figcaption");
    figcaption.text = genre.name;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    container.appendChild(figure);
}