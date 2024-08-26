export class Menu {
  /**
   * @param {string} eltName
   */
  constructor(eltName) {
    this.elt = document.querySelector(eltName);
  }

  /**
   * @param {string} selector
   * @param {() => void} callback
   */
  add(selector, callback) {
    this.elt.querySelector(selector).addEventListener("click", callback);
  }
}
