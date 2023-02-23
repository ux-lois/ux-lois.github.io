export const svgns = "http://www.w3.org/2000/svg";

export const querySelector = <T extends Element>(
  selector: string,
  type?: new () => T
): T => {
  const elt = document.querySelector(selector);
  if (elt === null) {
    throw new Error("Cannot find selector " + selector);
  }
  if (type !== undefined && !(elt instanceof type)) {
    throw new Error(`Selector ${selector} not of type ${type}`);
  }
  return elt as T;
};
