import { DrawingBoard } from "./DrawingBoard";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { Mode } from "./Mode";
import "./style.css";
import { Line } from "./widget/Line";

new Header().setTitle("The SVG Editor");

const board = new DrawingBoard("main");

const addLine = () => {
  board.prepareForInsert(new Line(board));
};
const cleanAll = () => console.log("clean all");

const menu = new Menu("aside");
menu.add("button.addLine", addLine);
menu.add("button.clean", cleanAll);

for (const mode of Mode) {
  console.log("mode: ", mode);
}
