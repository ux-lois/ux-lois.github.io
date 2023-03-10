import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const defaultEffect = (t: SVGTool) => {
  const g = querySelector(".defaultEffect svg g", SVGGElement);
  for (let i = 0; i < 5; i++) {
    t.createRect(g, 5 + i * 60, 30, 50, 50, 6, "emptyrect");
  }

  t.createPolyline(g, "15,40 30,70 40,50", "empty");
};
