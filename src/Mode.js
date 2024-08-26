// static keyword for field exists from ES2022

export class Mode {
  static DEFAULT = "mode-default";
  static WIDGET_INSERT = "mode-widget-insert";
  static WIDGET_SELECTED = "mode-widget-selected";
  static WIDGET_EDITING = "mode-widget-editing";

  // this function makes Mode an iterable.
  static *[Symbol.iterator]() {
    for (const v of Object.values(Mode)) {
      yield v;
    }
  }
}
