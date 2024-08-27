import { DrawingBoard } from "./DrawingBoard";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { Mode } from "./Mode";
import "./style.css";
import { Line } from "./widget/Line";

new Header("header").setTitle("The SVG Editor");

const board = new DrawingBoard("main");

const addLine = () => {
  board.prepareForInsert(new Line(board));
};
const cleanAll = () => board.clean();

const menu = new Menu("aside");
menu.add("button.addLine", addLine);
menu.add("button.clean", cleanAll);

for (const mode of Mode) {
  console.log("mode: ", mode);
}
