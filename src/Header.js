export class Header {
  constructor() {
    this.elt = document.querySelector("header");
  }

  setTitle(title) {
    this.elt.querySelector(".title").innerHTML = title;
  }
}
