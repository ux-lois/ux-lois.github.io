import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const decoy = (t: SVGTool) => {
  const g = querySelector(".decoy svg g", SVGGElement);
  t.createCircle(g, 55, 50, 25);
  t.createPolygon(g, "45,40 45,60 65,60 65,40");
  t.createCircle(g, 135, 50, 40);
  t.createCircle(g, 135, 50, 20);

  t.createCircle(g, 230, 50, 40);
  t.createCircle(g, 230, 50, 20);
  t.createPolygon(g, "220,40 220,60 240,60 240,40");
};
