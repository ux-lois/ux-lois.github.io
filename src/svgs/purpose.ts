import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const purpose = (t: SVGTool) => {
  const bigTarget1 = querySelector("svg.purpose g.target", SVGGElement);
  t.createCircle(bigTarget1, 150, 50, 40);
  t.createCircle(bigTarget1, 150, 50, 30);
  t.createCircle(bigTarget1, 150, 50, 20);
  t.createCircle(bigTarget1, 150, 50, 10);
  t.createCircle(bigTarget1, 150, 50, 1);
};
