import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const engagement = (t: SVGTool) => {
  const g = querySelector(".engagement svg g", SVGGElement);

  t.createCircle(g, 135, 50, 20);
};
