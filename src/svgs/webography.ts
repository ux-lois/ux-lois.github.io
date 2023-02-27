import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const webography = (t: SVGTool) => {
  const g = querySelector(".webography svg g", SVGGElement);
  for (let i = 0; i < 3; i++) {
    t.createCircle(g, 150, 50, 5 + 30 * i, {
      class: "empty-thin",
      delay: 0,
      duration: 2000,
    });
  }
};
