import { SVGTool } from "./SVGTool";
import { fitts } from "./svgs/fitts";
import { purpose } from "./svgs/purpose";
import { hick } from "./svgs/hick";
import { jakob } from "./svgs/jakob";
import { gradient } from "./svgs/gradient";

export const config: { [key: string]: ((t: SVGTool) => void)[] } = {
  "02-fitts": [fitts],
  "01-purpose": [purpose],
  "03-hick": [hick],
  "04-jakob": [jakob],
  "07-goal-gradient": [gradient],
};

const set = new Set<(t: SVGTool) => void>();
for (const values of Object.values(config)) {
  for (const value of values) {
    set.add(value);
  }
}
export const all = [...set];
