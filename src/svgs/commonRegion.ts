import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const commonRegion = (t: SVGTool) => {
  const g = querySelector("svg.commonRegion g", SVGGElement);
  t.createRect(g, 100 + 32, 12, 57, 37, 2);
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 4; y++) {
      t.createCircle(g, x * 20 + 100, y * 20 + 20, 5, {
        class: "full",
        delay: 0,
        duration: 300,
      });
    }
  }
};
