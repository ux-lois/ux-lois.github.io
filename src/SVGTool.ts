import * as d3 from "d3";
import { TransitionOptions } from "./interfaces/TransitionOptions";
import { querySelector } from "./misc";

export class SVGTool {
  delayCounter = 0;
  delayIncrement = 100;

  constructor(private useTranstion: boolean) {}
  getDelay() {
    this.delayCounter += this.delayIncrement;
    return this.delayCounter;
  }
  initAllSvg() {
    this.initFitts();
  }
  initFitts() {
    if (!document.querySelector("svg.fitts")) {
      return;
    }

    const bigTarget1 = querySelector("svg.fitts g.big-target1", SVGGElement);
    this.createCircle(bigTarget1, 40, 50, 35);
    this.createCircle(bigTarget1, 40, 50, 25);
    this.createCircle(bigTarget1, 40, 50, 15);
    this.createCircle(bigTarget1, 40, 50, 5);
    const bigTarget2 = querySelector("svg.fitts g.big-target2", SVGGElement);
    this.createCircle(bigTarget2, 40, 50, 35);
    this.createCircle(bigTarget2, 40, 50, 25);
    this.createCircle(bigTarget2, 40, 50, 15);
    this.createCircle(bigTarget2, 40, 50, 5);
    const smallTarget = querySelector("svg.fitts g.small-target", SVGGElement);
    this.createCircle(smallTarget, 40, 50, 5);
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

  createForm = <T extends { [key: string]: number | string }>(
    container: SVGGElement,
    eltName: string,
    initialAttributes: T,
    finalAttributes: Partial<T>,
    options?: Partial<TransitionOptions>
  ) => {
    const opts: TransitionOptions = { duration: 2000, delay: 1000, ...options };
    if (!this.useTranstion) {
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
