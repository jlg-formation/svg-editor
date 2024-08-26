export class Widget {
  /**
   * @param {import("../DrawingBoard").DrawingBoard} board
   */
  constructor(board) {
    if (new.target === Widget) {
      throw new Error("Widget cannot be instantiated.");
    }
    this.board = board;
  }
}
