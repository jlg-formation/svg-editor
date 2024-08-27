import { SVGNS, SVGUtils } from "../SVGUtils";
import { Widget } from "./Widget";

export class Line extends Widget {
  /**
   * @param {import("../DrawingBoard").DrawingBoard} board
   */
  constructor(board) {
    super(board);
  }

  /**
   * @param {MouseEvent} event
   */
  depose(event) {
    console.log("event: ", event);
    const { x, y } = SVGUtils.getCoordinates(event);
    this.x1 = x;
    this.y1 = y;
    this.x2 = this.x1 + 100;
    this.y2 = this.y1 + 100;

    const line = document.createElementNS(SVGNS, "line");
    line.setAttribute("x1", "" + this.x1);
    line.setAttribute("x2", "" + this.x2);
    line.setAttribute("y1", "" + this.y1);
    line.setAttribute("y2", "" + this.y2);
    line.setAttribute("stroke", "black");
    this.board.content.appendChild(line);
    this.elt = line;

    // selectable
    const selectableLine = document.createElementNS(SVGNS, "line");
    selectableLine.setAttribute("x1", "" + this.x1);
    selectableLine.setAttribute("x2", "" + this.x2);
    selectableLine.setAttribute("y1", "" + this.y1);
    selectableLine.setAttribute("y2", "" + this.y2);
    selectableLine.setAttribute("stroke", "hsla(120, 100%, 50%, 0.2)");
    selectableLine.setAttribute("stroke-width", "20");
    selectableLine.setAttribute("stroke-linecap", "round");
    selectableLine.setAttribute("fill", "transparent");
    selectableLine.addEventListener("click", () => {
      console.log("toggle select/unselect");
    });

    this.board.selectable.appendChild(selectableLine);
    this.selectableElt = selectableLine;
  }
}
