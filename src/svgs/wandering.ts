import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const wandering = (t: SVGTool) => {
  const g = querySelector(".wandering svg g", SVGGElement);
  for (let i = 0; i < 15; i++) {
    t.createCircle(g, 150, 50, 5 + 10 * i, {
      class: "empty-thin",
      delay: 0,
      duration: 2000,
    });
  }
};
