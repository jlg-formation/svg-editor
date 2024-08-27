import { SVGNS } from "./SVGUtils";
import { querySelectorFromElt } from "./utils";

export class EditionPoint {
  /**
   * @param {number} x
   * @param {number} y
   * @param {{label: string; onMouseDownFn: (evt: Event) => void}} options
   */
  constructor(x, y, { label = "tobedefined", onMouseDownFn = () => {} }) {
    this.group = document.createElementNS(SVGNS, "g");
    this.group.setAttribute("class", label);

    const circle = document.createElementNS(SVGNS, "circle");
    circle.setAttribute("r", "" + 3);
    circle.setAttribute("cx", "" + x);
    circle.setAttribute("cy", "" + y);
    circle.setAttribute("fill", "white");
    circle.setAttribute("stroke", "black");
    circle.setAttribute("class", "visible");
    this.group.appendChild(circle);

    const clickableArea = document.createElementNS(SVGNS, "circle");
    clickableArea.setAttribute("r", "" + 10);
    clickableArea.setAttribute("cx", "" + x);
    clickableArea.setAttribute("cy", "" + y);
    clickableArea.setAttribute("fill", "hsla(0, 100%, 50%, 0.5)");
    clickableArea.setAttribute("stroke", "transparent");
    clickableArea.setAttribute("class", "clickable");
    clickableArea.addEventListener("mousedown", (event) => {
      event.stopPropagation();
      onMouseDownFn(event);
    });
    this.group.appendChild(clickableArea);
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  edit(x, y) {
    const circle = querySelectorFromElt(this.group, "circle.visible");
    circle.setAttribute("cx", "" + x);
    circle.setAttribute("cy", "" + y);
    const clickableArea = querySelectorFromElt(this.group, "circle.clickable");
    clickableArea.setAttribute("cx", "" + x);
    clickableArea.setAttribute("cy", "" + y);
  }
}
