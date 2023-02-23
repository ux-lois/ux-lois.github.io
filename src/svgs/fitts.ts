import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const fitts = (t: SVGTool) => {
  const bigTarget1 = querySelector("svg.fitts g.big-target1", SVGGElement);
  t.createCircle(bigTarget1, 40, 50, 35);
  t.createCircle(bigTarget1, 40, 50, 25);
  t.createCircle(bigTarget1, 40, 50, 15);
  t.createCircle(bigTarget1, 40, 50, 5);
  const bigTarget2 = querySelector("svg.fitts g.big-target2", SVGGElement);
  t.createCircle(bigTarget2, 40, 50, 35);
  t.createCircle(bigTarget2, 40, 50, 25);
  t.createCircle(bigTarget2, 40, 50, 15);
  t.createCircle(bigTarget2, 40, 50, 5);
  const smallTarget = querySelector("svg.fitts g.small-target", SVGGElement);
  t.createCircle(smallTarget, 40, 50, 5);
};
