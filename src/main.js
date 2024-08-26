import { DrawingBoard } from "./DrawingBoard";
import { Header } from "./Header";
import { Menu } from "./Menu";
import "./style.css";

new Header().setTitle("The SVG Editor");

const addLine = () => console.log("add line");
const cleanAll = () => console.log("clean all");

const drawingBoard = new DrawingBoard("main");
console.log("drawingBoard: ", drawingBoard);

const menu = new Menu("aside");
menu.add("button.addLine", addLine);
menu.add("button.clean", cleanAll);
