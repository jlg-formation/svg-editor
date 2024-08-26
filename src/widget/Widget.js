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
}
