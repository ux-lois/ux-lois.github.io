import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const gestalt = (t: SVGTool) => {
  const g = querySelector("svg.gestalt g", SVGGElement);
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 5; y++) {
      t.createCircle(g, x * 10, y * 10, 1);
    }
  }
};
