import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const gradient = (t: SVGTool) => {
  const g = querySelector("svg.gradient g", SVGGElement);
  t.createRect(g, 5, 30, 40, 40, 1);
  t.createRect(g, 50, 30, 40, 40, 2);
  t.createRect(g, 95, 30, 40, 40, 3);
  t.createRect(g, 140, 30, 40, 40, 4);
  t.createRect(g, 185, 30, 40, 40, 5);
  t.createRect(g, 230, 30, 40, 40, 6);
};
