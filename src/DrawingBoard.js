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
  }

  set mode(val) {
    this.privateMode = val;
    this.modeElt.innerHTML = this.privateMode.toUpperCase();

    // set the right class on the component visual.
    // remove any class reflecting the mode
    for (const v of Mode) {
      this.elt.classList.remove(v);
    }
    // put the right class
    this.elt.classList.add(val);
  }

  get mode() {
    return this.privateMode;
  }

  /**
   * @param {import('./widget/Widget').Widget} widget
   */
  prepareForInsert(widget) {
    this.mode = Mode.WIDGET_INSERT;
    this.widget = widget;
  }
}
