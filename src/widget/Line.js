import { SVGNS, SVGUtils } from "../SVGUtils";
import { WidgetEdit } from "../WidgetEdit";
import { Widget } from "./Widget";

export class Line extends Widget {
  /**
   * @param {import("../DrawingBoard").DrawingBoard} board
   */
  constructor(board) {
    super(board);
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
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
    selectableLine.setAttribute("class", "clickable");
    selectableLine.addEventListener(
      "click",
      this.board.selectEditionMode(this),
    );

    this.board.selectable.appendChild(selectableLine);
    this.selectableElt = selectableLine;
  }

  select() {
    console.log("about to select line");

    // reset the existing selected widget if any.
    this.board.removeAllEditionPoints();

    // add edition points to 2 extremities.
    this.board.addEditionPoint(
      "start",
      this.x1,
      this.y1,
      new WidgetEdit(this, "start").getEditCallback(),
    );
    this.board.addEditionPoint(
      "end",
      this.x2,
      this.y2,
      new WidgetEdit(this, "end").getEditCallback(),
    );
  }

  unselect() {
    console.log("about to unselect line");
    this.board.removeAllEditionPoints();
  }

  /**
   * @param {string} pointName
   * @param {Line} orig
   * @param {{ x: number; y: number; }} delta
   */
  edit(pointName, orig, delta) {
    console.log("pointName: ", pointName);
    console.log("orig: ", orig);
    console.log("delta: ", delta);
    if (this.elt === undefined || this.selectableElt === undefined) {
      return;
    }
    if (pointName === "start") {
      this.x1 = delta.x + orig.x1;
      this.y1 = delta.y + orig.y1;
      this.elt.setAttribute("x1", "" + this.x1);
      this.elt.setAttribute("y1", "" + this.y1);
      this.selectableElt.setAttribute("x1", "" + this.x1);
      this.selectableElt.setAttribute("y1", "" + this.y1);
      const editionPoint = this.board.getEditionPoint(pointName);
      editionPoint.edit(this.x1, this.y1);
    }
    if (pointName === "end") {
      this.x2 = delta.x + orig.x2;
      this.y2 = delta.y + orig.y2;
      this.elt.setAttribute("x2", "" + this.x2);
      this.elt.setAttribute("y2", "" + this.y2);
      this.selectableElt.setAttribute("x2", "" + this.x2);
      this.selectableElt.setAttribute("y2", "" + this.y2);
      const editionPoint = this.board.getEditionPoint(pointName);
      editionPoint.edit(this.x2, this.y2);
    }
  }
}
