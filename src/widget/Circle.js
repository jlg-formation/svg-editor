import { SVGNS, SVGUtils } from "../SVGUtils";
import { WidgetEdit } from "../WidgetEdit";
import { WidgetMove } from "../WidgetMove";
import { Widget } from "./Widget";

export class Circle extends Widget {
  /**
   * @param {import("../DrawingBoard").DrawingBoard} board
   */
  constructor(board) {
    super(board);
    this.cx = 0;
    this.cy = 0;
    this.r = 0;
  }

  /**
   * @param {MouseEvent} event
   */
  depose(event) {
    console.log("event: ", event);
    const { x, y } = SVGUtils.getCoordinates(event);
    this.cx = x;
    this.cy = y;
    this.r = 50;

    const circle = document.createElementNS(SVGNS, "circle");
    circle.setAttribute("cx", "" + this.cx);
    circle.setAttribute("cy", "" + this.cy);
    circle.setAttribute("r", "" + this.r);
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", "transparent");
    this.board.content.appendChild(circle);
    this.elt = circle;

    // selectable
    const selectableCircle = document.createElementNS(SVGNS, "circle");
    selectableCircle.setAttribute("cx", "" + this.cx);
    selectableCircle.setAttribute("cy", "" + this.cy);
    selectableCircle.setAttribute("r", "" + this.r);
    selectableCircle.setAttribute("stroke", "hsla(120, 100%, 50%, 0.2)");
    selectableCircle.setAttribute("stroke-width", "20");
    selectableCircle.setAttribute("fill", "transparent");
    selectableCircle.addEventListener(
      "click",
      this.board.selectEditionMode(this),
    );
    selectableCircle.addEventListener(
      "mousedown",
      new WidgetMove(this).getMoveCallback(),
    );

    this.board.selectable.appendChild(selectableCircle);
    this.selectableElt = selectableCircle;
  }

  select() {
    console.log("about to select circle");

    // reset the existing selected widget if any.
    this.board.removeAllEditionPoints();

    // add edition points to 2 extremities.
    this.board.addEditionPoint(
      "center",
      this.cx,
      this.cy,
      new WidgetEdit(this, "center").getEditCallback(),
    );
    this.board.addEditionPoint(
      "top",
      this.cx,
      this.cy - this.r,
      new WidgetEdit(this, "top").getEditCallback(),
    );
  }

  unselect() {
    console.log("about to unselect circle");
    this.board.removeAllEditionPoints();
  }

  /**
   * @param {string} pointName
   * @param {Circle} orig
   * @param {{ x: number; y: number; }} delta
   */
  edit(pointName, orig, delta) {
    console.log("pointName: ", pointName);
    console.log("orig: ", orig);
    console.log("delta: ", delta);
    if (this.elt === undefined || this.selectableElt === undefined) {
      return;
    }
    if (pointName === "center") {
      // move
      this.cx = delta.x + orig.cx;
      this.cy = delta.y + orig.cy;
      this.elt.setAttribute("cx", "" + this.cx);
      this.elt.setAttribute("cy", "" + this.cy);
      this.selectableElt.setAttribute("cx", "" + this.cx);
      this.selectableElt.setAttribute("cy", "" + this.cy);
      const editionPoint = this.board.getEditionPoint("center");
      editionPoint.edit(this.cx, this.cy);
      const top = this.board.getEditionPoint("top");
      top.edit(this.cx, this.cy);
    }
    if (pointName === "top") {
      // zoom
      const top = { x: orig.cx + delta.x, y: orig.cy - orig.r + delta.y };
      this.r = Math.sqrt((top.x - orig.cx) ** 2 + (top.y - orig.cy) ** 2);
      this.elt.setAttribute("r", "" + this.r);
      this.selectableElt.setAttribute("r", "" + this.r);

      const topEditionPoint = this.board.getEditionPoint("top");
      topEditionPoint.edit(top.x, top.y);
    }
  }

  /**
   * @param {Circle} orig
   * @param {{ x: number; y: number; }} delta
   */
  move(orig, delta) {
    this.unselect();
    console.log("orig: ", orig);
    console.log("delta: ", delta);
    this.cx = delta.x + orig.cx;
    this.cy = delta.y + orig.cy;

    const circle = this.elt;
    if (circle === undefined) {
      return;
    }
    circle.setAttribute("cx", "" + this.cx);
    circle.setAttribute("cy", "" + this.cy);
    const sline = this.selectableElt;
    if (sline === undefined) {
      return;
    }
    sline.setAttribute("cx", "" + this.cx);
    sline.setAttribute("cy", "" + this.cy);
  }
}
