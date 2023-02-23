import { querySelector } from "../misc";
import { SVGTool } from "../SVGTool";

export const hick = (t: SVGTool) => {
  const g1 = querySelector("svg.hick g.choice-01", SVGGElement);
  t.createForm(
    g1,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,0 0,40 40,40" },
    {
      duration: 300,
      delay: t.getDelay(),
    }
  );
  const g2 = querySelector("svg.hick g.choice-02", SVGGElement);
  t.createForm(
    g2,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,0 0,40 40,40 40,0" },
    {
      duration: 300,
      delay: t.getDelay(),
    }
  );
  const g3 = querySelector("svg.hick g.choice-03", SVGGElement);
  t.createForm(
    g3,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,40 40,40 40,0" },
    {
      duration: 300,
      delay: t.getDelay(),
    }
  );
  const g4 = querySelector("svg.hick g.choice-04", SVGGElement);
  t.createForm(
    g4,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,0 20,40 40,0" },
    {
      duration: 300,
      delay: t.getDelay(),
    }
  );
  const g5 = querySelector("svg.hick g.choice-05", SVGGElement);
  t.createForm(
    g5,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,0 0,40 40,20" },
    {
      duration: 300,
      delay: t.getDelay(),
    }
  );
  const g6 = querySelector("svg.hick g.choice-06", SVGGElement);
  t.createForm(
    g6,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,40 40,40 20,0" },
    {
      duration: 300,
      delay: t.getDelay(),
    }
  );
};
