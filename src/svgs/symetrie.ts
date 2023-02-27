import { querySelector } from "../misc";
import type { SVGTool } from "../SVGTool";

const points =
  "20,10, 20,20 10,30, 20,40 20,50, 10,50 10,60 20,60 20,70 20,80 10,90";

export const symetrie = (t: SVGTool) => {
  const g = querySelector(".symetrie svg g", SVGGElement);
  g.innerHTML = `
<g class="p1" transform="translate(60)"></g>
<g class="p2" transform="translate(80)"></g>
<g class="p3" transform="translate(180)"></g>
<g class="p4" transform="translate(230) scale(-1, 1)"></g>
`;

  const g1 = querySelector(".symetrie svg g.p1", SVGGElement);
  t.createPolyline(g1, points, "empty");
  const g2 = querySelector(".symetrie svg g.p2", SVGGElement);
  t.createPolyline(g2, points, "empty");

  const g3 = querySelector(".symetrie svg g.p3", SVGGElement);
  t.createPolyline(g3, points, "empty");
  const g4 = querySelector(".symetrie svg g.p4", SVGGElement);
  t.createPolyline(g4, points, "empty");
};
