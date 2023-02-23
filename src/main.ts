import "./scss/styles.scss";
import { SVGTool } from "./SVGTool";

import { initTheme } from "./theme";

initTheme();

console.log("window.location: ", window.location);
const useTransition = window.location.pathname.match(/\/cards\//) !== null;

const svgTool = new SVGTool(useTransition);
svgTool.initAllSvg();
