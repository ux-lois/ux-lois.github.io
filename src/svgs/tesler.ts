import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const tesler = (t: SVGTool) => {
  const g = querySelector("svg.tesler g", SVGGElement);
  for (let i = 0; i < 10; i++) {
    t.createCircle(g, 50 + i * 20, 10, 5, { class: i >= 5 ? "empty" : "full" });
  }
  for (let i = 0; i < 10; i++) {
    t.createCircle(g, 50 + i * 20, 50, 5, { class: i % 2 ? "empty" : "full" });
  }
  for (let i = 0; i < 10; i++) {
    t.createCircle(g, 50 + i * 20, 90, 5, { class: i < 5 ? "empty" : "full" });
  }
};
