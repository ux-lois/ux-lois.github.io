import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const similarity = (t: SVGTool) => {
  const g = querySelector("svg.similarity g", SVGGElement);
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 4; y++) {
      const myClass = x > 1 && y < 2 ? "xxx" : "full";
      t.createCircle(g, x * 20 + 100, y * 20 + 20, 5, {
        class: myClass,
        delay: 0,
        duration: 300,
      });
    }
  }
};
