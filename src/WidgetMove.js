export class WidgetMove {
  /**
   * @param {import("./widget/Widget").Widget} widget
   */
  constructor(widget) {
    this.widget = widget;
    this.orig = this.widget.getOrigin();
    console.log("new widgetmove on ", this.widget);
  }

  /**
   * @return {(event: MouseEvent) => void}
   */
  getMoveCallback() {
    return (event) => {
      console.log("mousedown", this.widget.getType());
      event.preventDefault();
      event.stopPropagation();

      this.orig = this.widget.getOrigin();
      const startX = event.pageX;
      const startY = event.pageY;

      const mousemove = (/** @type {MouseEvent} */ evt) => {
        this.widget.move(this.orig, {
          x: evt.pageX - startX,
          y: evt.pageY - startY,
        });
      };

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);

      function mouseup() {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      }
    };
  }
}
