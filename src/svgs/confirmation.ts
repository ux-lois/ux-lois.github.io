import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

export const confirmation = (t: SVGTool) => {
  const g = querySelector(".confirmation svg g", SVGGElement);
  t.createCircle(g, 120, 50, 45, { class: "semi-emtpy" });
  t.createCircle(g, 180, 50, 45, { class: "semi-emtpy" });
};
