import { SVGTool } from "./SVGTool";
import { fitts } from "./svgs/fitts";
import { purpose } from "./svgs/purpose";
import { hick } from "./svgs/hick";

export const config: { [key: string]: ((t: SVGTool) => void)[] } = {
  "02-fitts": [fitts],
  "01-purpose": [purpose],
  "03-hick": [hick],
};

const set = new Set<(t: SVGTool) => void>();
for (const values of Object.values(config)) {
  for (const value of values) {
    set.add(value);
  }
}
export const all = [...set];
