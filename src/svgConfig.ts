import { SVGTool } from "./SVGTool";
import { fitts } from "./svgs/fitts";
import { purpose } from "./svgs/purpose";
import { hick } from "./svgs/hick";
import { jakob } from "./svgs/jakob";
import { gradient } from "./svgs/gradient";
import { gestalt } from "./svgs/gestalt";
import { proximity } from "./svgs/proximity";
import { similarity } from "./svgs/similarity";
import { commonRegion } from "./svgs/commonRegion";
import { simplicity } from "./svgs/simplicity";

export const config: { [key: string]: ((t: SVGTool) => void)[] } = {
  fitts: [fitts],
  purpose: [purpose],
  hick: [hick],
  jakob: [jakob],
  gradient: [gradient],
  gestalt: [gestalt],
  proximity: [proximity],
  similarity: [similarity],
  commonRegion: [commonRegion],
  simplicity: [simplicity],
};

const set = new Set<(t: SVGTool) => void>();
for (const values of Object.values(config)) {
  for (const value of values) {
    set.add(value);
  }
}
export const all = [...set];
