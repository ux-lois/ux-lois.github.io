import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const miller = (t: SVGTool) => {
  const g = querySelector("svg.miller g", SVGGElement);
  t.createCircle(g, 130, 20, 5, { class: "full" });
  t.createCircle(g, 150, 20, 5, { class: "full" });
  t.createCircle(g, 170, 20, 5, { class: "full" });
  t.createCircle(g, 170, 40, 5, { class: "full" });
  t.createCircle(g, 170, 60, 5, { class: "full" });
  t.createCircle(g, 170, 80, 5, { class: "full" });
};
