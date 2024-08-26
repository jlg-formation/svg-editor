import { Widget } from "./Widget";

export class Line extends Widget {
  /**
   * @param {import("../DrawingBoard").DrawingBoard} board
   */
  constructor(board) {
    super(board);
  }

  /**
   * @param {MouseEvent} event
   */
  depose(event) {
    console.log("event: ", event);
  }
}
