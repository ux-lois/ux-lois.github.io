import "./scss/styles.scss";
import { SVGTool } from "./SVGTool";

import { initTheme } from "./theme";
import { initVueJs } from "./vue";

initTheme();

const svgTool = new SVGTool();
svgTool.initSvg();

initVueJs();
