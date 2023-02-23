import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const simplicity = (t: SVGTool) => {
  const g = querySelector("svg.simplicity g", SVGGElement);
  t.createRect(g, 100 + 32, 12, 57, 37, 2);
  t.createRect(g, 100 - 8, 12, 97, 77, 2);
};
