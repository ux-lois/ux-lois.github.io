import { SVGTool } from "./SVGTool";
import { fitts } from "./svgs/fitts";
import { purpose } from "./svgs/purpose";

export const config: { [key: string]: ((t: SVGTool) => void)[] } = {
  "02-fitts": [fitts],
  "01-purpose": [purpose],
};

const set = new Set<(t: SVGTool) => void>();
for (const values of Object.values(config)) {
  for (const value of values) {
    set.add(value);
  }
}
export const all = set;
