import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const gestalt = (t: SVGTool) => {
  const g = querySelector("svg.gestalt g", SVGGElement);
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
