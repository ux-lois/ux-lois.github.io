import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const pareto = (t: SVGTool) => {
  const g = querySelector(".pareto svg g", SVGGElement);
  t.createRect(g, 50, 40, 50, 20, 6, "empty");
  t.createRect(g, 150, 10, 100, 80, 6, "empty");
};
