import * as convert from "color-convert";
import { HSL, KEYWORD, LAB, RGB } from "color-convert/conversions";

export const initTheme = () => {
  handleDarkTheme();

  document.documentElement.style.setProperty(
    "--primary-color",
    "hsl(120, 100%, 25%)"
  );
  document.documentElement.style.setProperty(
    "--fill-color",
    "hsla(120, 100%, 25%, 0.1)"
  );
};

const handleDarkTheme = () => {
  const isDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const cl = document.body.classList;
  isDark ? cl.add("dark") : cl.add("light");

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const colorScheme = e.matches ? "dark" : "light";
      console.log("colorScheme: ", colorScheme);

      cl.remove("dark");
      cl.remove("light");
      if (colorScheme === "dark") {
        cl.add("dark");
      } else {
        cl.add("light");
      }
    });
};
