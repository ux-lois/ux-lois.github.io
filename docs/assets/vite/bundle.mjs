const o = () => {
  const a = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, e = document.body.classList;
  a ? e.add("dark") : e.add("light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (c) => {
    const d = c.matches ? "dark" : "light";
    console.log("colorScheme: ", d), e.remove("dark"), e.remove("light"), d === "dark" ? e.add("dark") : e.add("light");
  });
};
o();
