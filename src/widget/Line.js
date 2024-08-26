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
  }
}
