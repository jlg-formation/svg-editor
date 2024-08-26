import { Mode } from "./Mode";
import { querySelector, querySelectorFromElt } from "./utils";

export class DrawingBoard {
  /**
   * @param {string} selector
   */
  constructor(selector) {
    this.elt = querySelector(selector);

    // we add drawing-board class in order to let the DrawingBoard.css file to be applied.
    this.elt.classList.add("drawing-board");

    // initializing to SVG and mode DIV.
    this.elt.innerHTML = '<svg></svg><div class="mode"></div>';
    this.svg = querySelectorFromElt(this.elt, "svg");

    this.modeElt = querySelectorFromElt(this.elt, ".mode");
    this.mode = Mode.DEFAULT;

    this.refreshMode();
  }

  refreshMode() {
    this.modeElt.innerHTML = this.mode.toUpperCase();
  }
}
