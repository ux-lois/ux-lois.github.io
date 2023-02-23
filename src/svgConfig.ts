import { SVGTool } from "./SVGTool";
import { fitts } from "./svgs/fitts";
import { purpose } from "./svgs/purpose";
import { hick } from "./svgs/hick";
import { jakob } from "./svgs/jakob";
import { gradient } from "./svgs/gradient";
import { gestalt } from "./svgs/gestalt";
import { proximity } from "./svgs/proximity";

export const config: { [key: string]: ((t: SVGTool) => void)[] } = {
  "02-fitts": [fitts],
  "01-purpose": [purpose],
  "03-hick": [hick],
  "04-jakob": [jakob],
  "07-goal-gradient": [gradient],
  "08-gestalt": [gestalt],
  "09-law-of-proximity": [proximity],
};

const set = new Set<(t: SVGTool) => void>();
for (const values of Object.values(config)) {
  for (const value of values) {
    set.add(value);
  }
}
export const all = [...set];
