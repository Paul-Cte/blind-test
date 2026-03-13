// a
import { view } from "../view/view.js";

let currentTranslate = 0;

view.interfaceSelection.addEventListener("click", (event) => {
  const figures = view.interfaceSelection.querySelectorAll("figure");

  if (window.innerWidth > 900) {
    figures.forEach((figure) => {
      if (figure.contains(event.target)) {
        figures.forEach((figure) => {
          figure.classList.remove("active");
        });
        figure.classList.add("active");
        const dimensions = figure.getBoundingClientRect();

        if (dimensions.right > window.innerWidth) {
          currentTranslate += dimensions.width + 70;
          view.interfaceSelection.style.transform = `translateX(-${currentTranslate}px)`;
        } else if (dimensions.left < 0) {
          currentTranslate -= dimensions.width + 70;
          view.interfaceSelection.style.transform = `translateX(-${currentTranslate}px)`;
        }
      }
    });
  } else {
    figures.forEach((figure) => {
      figure.classList.add("active");
    });
  }
});
