import { Mode } from "./Mode";

export class WidgetEdit {
  /**
   * @param {import("./widget/Widget").Widget} widget
   * @param {string} pointName
   */
  constructor(widget, pointName) {
    this.widget = widget;
    this.pointName = pointName;
    console.log("new widgetedit on ", this.widget, this.pointName);
  }

  getEditCallback() {
    return (
      /** @type {{ preventDefault: () => void; stopPropagation: () => void; pageX: any; pageY: any; }} */ event,
    ) => {
      console.log("mousedown", this.widget.getType());
      event.preventDefault();
      event.stopPropagation();

      this.orig = this.widget.getOrigin();
      const startX = event.pageX;
      const startY = event.pageY;

      const mousemove = (
        /** @type {{ pageX: number; pageY: number; }} */ evt,
      ) => {
        this.widget.edit(this.pointName, this.orig, {
          x: evt.pageX - startX,
          y: evt.pageY - startY,
        });
        this.widget.board.mode = Mode.WIDGET_EDITING;
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
