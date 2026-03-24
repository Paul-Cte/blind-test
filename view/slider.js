// slider.js
export class Slider {
  constructor(container, onSelect) {
    this.container = container;
    this.onSelect = onSelect; // callback(playlistId) quand on clique sur une active
    this.container.addEventListener("click", (e) => this.handleClick(e));
  }

  handleClick(e) {
    const figure = e.target.closest("figure");
    if (!figure) return;

    if (figure.classList.contains("active")) {
      this.onSelect(figure.dataset.playlist);
    } else {
      this.setActive(figure);
    }
  }

  setActive(figure) {
    this.container
      .querySelectorAll("figure")
      .forEach((f) => f.classList.remove("active"));
    figure.classList.add("active");
    this.scrollTo(figure);
  }

  scrollTo(figure) {
    const cRect = this.container.getBoundingClientRect();
    const fRect = figure.getBoundingClientRect();

    const isVisible = fRect.left >= cRect.left && fRect.right <= cRect.right;
    if (isVisible) return;

    // On calcule le scrollLeft cible pour centrer la figure
    const targetScroll =
      this.container.scrollLeft +
      fRect.left -
      cRect.left -
      (cRect.width - fRect.width) / 2;

    this.container.scrollTo({ left: targetScroll, behavior: "smooth" });
  }
}