import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const proximity = (t: SVGTool) => {
  const g = querySelector("svg.proximity g", SVGGElement);
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 4; y++) {
      const offset = x > 1 && y < 2 ? 8 : 0;
      t.createCircle(g, x * 20 + 100 + offset, y * 20 + 20 - offset, 5, {
        class: "full",
        delay: 0,
        duration: 300,
      });
    }
  }
};
