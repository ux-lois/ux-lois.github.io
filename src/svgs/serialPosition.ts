import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const serialPosition = (t: SVGTool) => {
  const g = querySelector(".serialPosition svg g", SVGGElement);
  for (let x = 0; x < 7; x++) {
    const cssClass = x === 0 || x === 6 ? "full" : "empty";
    t.createCircle(g, x * 40 + 30, 50, 20, {
      class: cssClass,
      delay: 0,
      duration: 300,
    });
  }
};
