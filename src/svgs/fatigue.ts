import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const fatigue = (t: SVGTool) => {
  const g = querySelector(".fatigue svg g", SVGGElement);
  t.createPolygon(g, "130,10 130,90 40,50");
  t.createPolygon(g, "170,10 170,90 260,50", "full");
};
