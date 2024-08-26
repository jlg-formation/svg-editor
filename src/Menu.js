import { querySelector, querySelectorFromElt } from "./utils";

export class Menu {
  /**
   * @param {string} eltName
   */
  constructor(eltName) {
    this.elt = querySelector(eltName);
  }

  /**
   * @param {string} selector
   * @param {() => void} callback
   */
  add(selector, callback) {
    querySelectorFromElt(this.elt, selector).addEventListener(
      "click",
      callback,
    );
  }
}
