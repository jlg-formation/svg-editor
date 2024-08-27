export class Widget {
  /**
   * @param {import("../DrawingBoard").DrawingBoard} board
   */
  constructor(board) {
    if (new.target === Widget) {
      throw new Error(`${this.constructor.name} cannot be instantiated.`);
    }
    this.board = board;
  }

  /**
   * @param {MouseEvent} _event
   */
  depose(_event) {
    throw new Error("Cannot call an abstract method");
  }

  select() {
    throw new Error("Cannot call an abstract method");
  }

  unselect() {
    throw new Error("Cannot call an abstract method");
  }

  getType() {
    return this.constructor.name;
  }

  /**
   * return a shallow clone of the widget.
   */
  getOrigin() {
    return { ...this };
  }

  /**
   * @param {string} _pointName the point label
   * @param {Widget | undefined} _orig the widget before the modification
   * @param {{ x: number; y: number; }} _delta the delta that is done while moving
   */
  edit(_pointName, _orig, _delta) {
    throw new Error("Cannot call an abstract method");
  }

  /**
   * @param {Widget} _orig
   * @param {{ x: number; y: number; }} _delta
   */
  move(_orig, _delta) {
    throw new Error("Cannot call an abstract method");
  }
}
