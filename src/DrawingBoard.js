import { EditionPoint } from "./EditionPoint";
import { Mode, printMode } from "./Mode";
import { SVGUtils } from "./SVGUtils";
import {
  querySelector,
  querySelectorFromElt,
  querySelectorSvgFromElt,
} from "./utils";

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
    this.svg = querySelectorSvgFromElt(this.elt);

    // adding 3 groups for the editor :
    this.content = SVGUtils.addGroup(this.svg, "content"); // where the real SVG stuff are
    this.selectable = SVGUtils.addGroup(this.svg, "selectable"); // the selection areas
    this.edition = SVGUtils.addGroup(this.svg, "edition"); // where the edition points will be

    /** @type {Map<String, EditionPoint>} */
    this.editionMap = new Map();

    this.modeElt = querySelectorFromElt(this.elt, ".mode");
    this.mode = Mode.DEFAULT;

    this.svg.addEventListener("click", (event) => {
      if (this.widget) {
        if (this.mode === Mode.WIDGET_INSERT) {
          this.widget.depose(event);
          this.mode = Mode.DEFAULT;
          this.widget = undefined;
          return;
        }
        if (this.mode === Mode.WIDGET_SELECTED) {
          this.widget.unselect();
          this.mode = Mode.DEFAULT;
          return;
        }
      }
      if (this.mode === Mode.WIDGET_EDITING) {
        this.mode = Mode.WIDGET_SELECTED;
        return;
      }
    });
  }

  set mode(val) {
    this.privateMode = val;
    this.modeElt.innerHTML = printMode`Actual Mode is ${this.privateMode}`;

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

  /**
   * @param {import('./widget/Widget').Widget} widget
   */
  selectEditionMode(widget) {
    return (/** @type {Event} */ event) => {
      // important for not unselecting just after selecting.
      event.stopPropagation();

      if (this.widget === widget) {
        this.unselect();
        return;
      }
      this.select(widget);
    };
  }

  /**
   * @param {import('./widget/Widget').Widget} widget
   */
  select(widget) {
    this.mode = Mode.WIDGET_SELECTED;
    this.widget = widget;
    this.widget.select();
  }

  unselect() {
    this.mode = Mode.DEFAULT;
    if (this.widget) {
      this.widget.unselect();
    }
    this.widget = undefined;
  }

  removeAllEditionPoints() {
    SVGUtils.removeAllChildren(this.edition);
  }

  /**
   * @param {string} label
   * @param {number} x
   * @param {number} y
   * @param {() => void} onMouseDownFn
   */
  addEditionPoint(label, x, y, onMouseDownFn) {
    const editionPoint = new EditionPoint(x, y, {
      label,
      onMouseDownFn,
    });
    this.edition.appendChild(editionPoint.group);
    this.editionMap.set(label, editionPoint);
  }

  /**
   * @param {string} label
   */
  getEditionPoint(label) {
    const result = this.editionMap.get(label);
    if (result === undefined) {
      throw new Error(`Cannot get edition point: ${label}`);
    }
    return result;
  }
}
