export const SVGNS = "http://www.w3.org/2000/svg";

export class SVGUtils {
  /**
   * Retrieve the coordinates inside the `event.target`
   * @param {MouseEvent} event
   */
  static getCoordinates(event) {
    const e = event.target;
    if (!(e instanceof Element)) {
      throw new Error("no target");
    }
    const dim = e.getBoundingClientRect();
    const x = event.clientX - dim.left;
    const y = event.clientY - dim.top;
    return { x, y };
  }

  /**
   * @param {SVGElement} parent
   * @param {string} name
   */
  static addGroup(parent, name) {
    const group = document.createElementNS(SVGNS, "g");
    group.setAttribute("class", name);
    parent.appendChild(group);
    return group;
  }

  /**
   * @param {SVGGElement} group
   */
  static removeAllChildren(group) {
    while (group.firstChild) {
      group.removeChild(group.firstChild);
    }
  }
}
