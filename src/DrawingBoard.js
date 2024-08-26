import { querySelector } from "./utils";

export class DrawingBoard {
  /**
   * @param {string} selector
   */
  constructor(selector) {
    this.elt = querySelector(selector);
  }
}
