import * as d3 from "d3";
import { TransitionOptions } from "./interfaces/TransitionOptions";
import { config, all } from "./svgConfig";

export class SVGTool {
  delayCounter = 0;
  delayIncrement = 100;
  useTransition = false;

  svgName: string | undefined = undefined;
  constructor() {
    this.initSvgName();
  }

  initSvgName() {
    const regex = window.location.pathname.match(/^.*\/cards\/(.*)(.html)$/);
    console.log("regex: ", regex);
    if (regex instanceof Array && regex.length > 2) {
      this.svgName = regex[1];
      this.useTransition = true;
      return;
    }
    this.useTransition = false;
  }

  initSvg() {
    const list = this.svgName ? config[this.svgName] : all;
    if (list === undefined) {
      return;
    }
    for (const f of list) {
      f(this);
    }
  }

  getDelay() {
    this.delayCounter += this.delayIncrement;
    return this.delayCounter;
  }

  createCircle(group: SVGGElement, cx: number, cy: number, r: number) {
    return this.createForm(
      group,
      "circle",
      {
        cx,
        cy,
        r: 0,
      },
      { r },
      {
        duration: 300,
        delay: this.getDelay(),
      }
    );
  }

  createPolygon(group: SVGGElement, points: string) {
    return this.createForm(
      group,
      "polygon",
      { points: "" },
      { points: points },
      {
        duration: 300,
        delay: this.getDelay(),
      }
    );
  }

  createForm = <T extends { [key: string]: number | string }>(
    container: SVGGElement,
    eltName: string,
    initialAttributes: T,
    finalAttributes: Partial<T>,
    options?: Partial<TransitionOptions>
  ) => {
    const opts: TransitionOptions = { duration: 2000, delay: 1000, ...options };
    if (!this.useTransition) {
      opts.delay = 0;
      opts.duration = 0;
    }
    const elt = d3.select(container).append(eltName);

    for (const [key, value] of Object.entries(initialAttributes)) {
      elt.attr(key, value);
    }

    const t = elt
      .transition()
      .duration(opts.duration)
      .delay(opts.delay)
      .ease(d3.easeLinear);

    for (const [key, value] of Object.entries(finalAttributes)) {
      t.attr(key, value);
    }
  };
}
