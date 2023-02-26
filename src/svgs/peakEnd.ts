import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const peakEnd = (t: SVGTool) => {
  const g = querySelector(".peakEnd svg g", SVGGElement);
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 4; y++) {
      const cssClass =
        (x === 1 && y === 1) || (x === 4 && y === 3) ? "empty" : "full";
      t.createCircle(g, x * 20 + 100, y * 20 + 20, 5, {
        class: cssClass,
      });
    }
  }
};
