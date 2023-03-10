import * as d3 from "d3";
import type { TransitionOptions } from "./interfaces/TransitionOptions";
import { getUxLawState } from "./misc";
import { all, config } from "./svgConfig";

export class SVGTool {
  delayCounter = 0;
  delayIncrement = 100;
  useTransition = false;

  svgName: string | undefined = undefined;
  constructor() {
    this.initSvgName();
  }

  initSvgName() {
    const uxLawState = getUxLawState();
    if (uxLawState === undefined) {
      this.useTransition = false;
      return;
    }
    console.log("uxLawState: ", uxLawState);
    const svgName =
      uxLawState.page.image === "default"
        ? uxLawState.page.class
        : uxLawState.page.image;

    this.svgName = svgName;
    this.useTransition = true;
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

  createCircle(
    group: SVGGElement,
    cx: number,
    cy: number,
    r: number,
    options?: Partial<TransitionOptions>
  ) {
    const opts = {
      duration: 300,
      delay: this.getDelay(),
      ...options,
    };
    return this.createForm(
      group,
      "circle",
      {
        cx,
        cy,
        r: 0,
      },
      { r },
      opts
    );
  }

  createPolygon(group: SVGGElement, points: string, cssClass = "empty") {
    return this.createForm(
      group,
      "polygon",
      { points: "" },
      { points: points },
      {
        duration: 300,
        delay: this.getDelay(),
        class: cssClass,
      }
    );
  }

  createPolyline(group: SVGGElement, points: string, cssClass = "full") {
    return this.createForm(
      group,
      "polyline",
      { points: "" },
      { points: points },
      {
        duration: 300,
        delay: this.getDelay(),
        class: cssClass,
      }
    );
  }

  createRect(
    group: SVGGElement,
    x: number,
    y: number,
    width: number,
    height: number,
    intensity = 6,
    cssClass = "empty"
  ) {
    return this.createForm(
      group,
      "rect",
      { x, y, width, height: 0, opacity: intensity * (1.0 / 6) },
      { height: height },
      {
        duration: 300,
        delay: this.getDelay(),
        class: cssClass,
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
    const opts: TransitionOptions = {
      duration: 2000,
      delay: 1000,
      class: "",
      ...options,
    };
    if (!this.useTransition) {
      opts.delay = 0;
      opts.duration = 0;
    }
    const elt = d3.select(container).append(eltName);

    for (const [key, value] of Object.entries(initialAttributes)) {
      elt.attr(key, value);
    }
    if (opts.class) {
      elt.attr("class", opts.class);
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
