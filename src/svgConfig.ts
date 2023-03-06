import type { SVGTool } from "./SVGTool";
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
import { miller } from "./svgs/miller";
import { tesler } from "./svgs/tesler";
import { postel } from "./svgs/postel";
import { zeigarnik } from "./svgs/zeigarnik";
import { vonRestorff } from "./svgs/vonRestorff";
import { symetrie } from "./svgs/symetrie";
import { serialPosition } from "./svgs/serialPosition";
import { pareto } from "./svgs/pareto";
import { peakEnd } from "./svgs/peakEnd";
import { anchor } from "./svgs/anchor";
import { wandering } from "./svgs/wandering";
import { webography } from "./svgs/webography";
import { confirmation } from "./svgs/confirmation";
import { fatigue } from "./svgs/fatigue";
import { decoy } from "./svgs/decoy";

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
  miller: [miller],
  tesler: [tesler],
  postel: [postel],
  zeigarnik: [zeigarnik],
  vonRestorff: [vonRestorff],
  symetrie: [symetrie],
  serialPosition: [serialPosition],
  pareto: [pareto],
  peakEnd: [peakEnd],
  anchor: [anchor],
  wandering: [wandering],
  webography: [webography],
  confirmation: [confirmation],
  fatigue: [fatigue],
  decoy: [decoy],
};

const set = new Set<(t: SVGTool) => void>();
for (const values of Object.values(config)) {
  for (const value of values) {
    set.add(value);
  }
}
export const all = [...set];
