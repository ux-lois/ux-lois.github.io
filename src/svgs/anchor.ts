import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const anchor = (t: SVGTool) => {
  const g = querySelector(".anchor svg g", SVGGElement);
  t.createCircle(g, 100, 50, 35);
  t.createPolyline(g, "60,10 140,90");
  t.createPolyline(g, "140,10 60,90");
  t.createCircle(g, 200, 50, 20);
};
