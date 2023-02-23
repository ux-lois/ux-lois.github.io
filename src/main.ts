import "./scss/styles.scss";
import { SVGTool } from "./SVGTool";

import { initTheme } from "./theme";

initTheme();

const svgTool = new SVGTool();
svgTool.initSvg();
