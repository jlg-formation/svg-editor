import { querySelector } from "./utils";

export class Header {
  setTitle(title) {
    querySelector("header .title").innerHTML = title;
  }
}
