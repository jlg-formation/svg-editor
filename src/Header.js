import { querySelector, querySelectorFromElt, sleep } from "./utils";

export class Header {
  /**
   * @param {string} selector
   */
  constructor(selector) {
    this.elt = querySelector(selector);
    this.initEffectOnTitle();
  }

  /**
   * @param {string} title
   */
  setTitle(title) {
    querySelectorFromElt(this.elt, ".title").innerHTML = title;
  }

  initEffectOnTitle() {
    querySelectorFromElt(this.elt, ".title").addEventListener(
      "click",
      this.onClick.bind(this),
    );
  }

  async onClick() {
    const titleElt = querySelectorFromElt(this.elt, ".title");
    const title = titleElt.innerHTML;
    console.log("onclick", title);

    for (let i = 0; i <= title.length; i++) {
      await sleep(200);

      const [before, letter, after] = [
        title.substring(0, i),
        title.substring(i, i + 1),
        title.substring(i + 1),
      ];
      const niceTitle = `${before}<span style="color: red">${letter}</span>${after}`;
      titleElt.innerHTML = niceTitle;
    }
  }
}
