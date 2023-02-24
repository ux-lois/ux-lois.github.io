import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const postel = (t: SVGTool) => {
  const g = querySelector("svg.postel g", SVGGElement);
  t.createCircle(g, 80, 50, 35, { class: "full" });
  t.createCircle(g, 220, 50, 35, { class: "empty" });
};
