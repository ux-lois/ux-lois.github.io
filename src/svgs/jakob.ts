import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const jakob = (t: SVGTool) => {
  const app1 = querySelector("svg.jakob g.app-1", SVGGElement);
  t.createCircle(app1, 40, 50, 35);
  const app2 = querySelector("svg.jakob g.app-2", SVGGElement);
  t.createCircle(app2, 40, 50, 35);
  const yourApp = querySelector("svg.jakob g.your-app", SVGGElement);
  t.createCircle(yourApp, 40, 50, 35);
};
