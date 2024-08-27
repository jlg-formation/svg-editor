/**
 *
 * @param {string} selector
 * @return {HTMLElement}
 */
export const querySelector = (selector) => {
  const elt = document.querySelector(selector);
  if (elt === null) {
    throw new Error(`Cannot find selector ${selector}`);
  }
  // @ts-ignore
  return elt;
};

/**
 *
 * @param {Element} element
 * @param {string} selector
 * @return {Element}
 */
export const querySelectorFromElt = (element, selector) => {
  const elt = element.querySelector(selector);
  if (elt === null) {
    throw new Error(`Cannot find selector ${selector}`);
  }
  // @ts-ignore
  return elt;
};

/**
 *
 * @param {Element} element
 * @return {SVGElement}
 */
export const querySelectorSvgFromElt = (element) => {
  const elt = element.querySelector("svg");
  if (elt === null) {
    throw new Error(`Cannot find selector svg`);
  }
  // @ts-ignore
  return elt;
};
