import { querySelector } from "./misc";

export const initTheme = () => {
  handleDarkTheme();

  document.documentElement.style.setProperty(
    "--primary-color",
    "hsl(120, 100%, 25%)"
  );
  document.documentElement.style.setProperty(
    "--fill-color",
    "hsla(120, 0%, 25%, 0.1)"
  );

  handleUglyTheme();
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

(window as any).toggleUglyTheme = () => {
  let themeName = localStorage.getItem("theme");
  themeName = themeName !== "ugly" ? "ugly" : "default";
  localStorage.setItem("theme", themeName);

  console.log("update theme to " + themeName);
  document.body.classList.remove("ugly");
  document.body.classList.remove("default");

  document.body.classList.add(themeName);

  updateButtonTheme();
};

const handleUglyTheme = () => {
  let themeName = localStorage.getItem("theme");
  themeName = themeName !== "ugly" ? "default" : "ugly";
  document.body.classList.add(themeName);

  updateButtonTheme();
};

const updateButtonTheme = () => {
  let themeName = localStorage.getItem("theme");
  const label =
    themeName === "ugly" ? "Remettre l'esthétique" : "Enlever l'esthétique";
  const button = document.querySelector("button.toggle-theme");
  if (button) {
    button.innerHTML = label;
  }

  const div = querySelector("header div.ugly-theme");

  div.innerHTML =
    themeName !== "ugly"
      ? ""
      : `
<button onClick="window.toggleUglyTheme()"> 
  Remettre l'esthétique
</button>
    `;
};
