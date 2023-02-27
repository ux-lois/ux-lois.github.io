import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const zeigarnik = (t: SVGTool) => {
  const g = querySelector("svg.zeigarnik g", SVGGElement);
  for (let i = 1; i < 5; i++) {
    t.createRect(g, 50, i * 15, 200, 10, 6, "emptyrect");
  }
  t.createRect(g, 50, 5 * 15, 150, 10, 6, "fullrect");
};
