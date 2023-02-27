import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */

/* import specific icons */
import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { initGradient } from "./vuejs/init/gradient";
import { initWandering } from "./vuejs/init/wandering";

/* add icons to the library */
library.add(faCircleNotch);
library.add(faPlus);

export const initVueJs = () => {
  console.log("init vuejs stuff");

  initGradient();
  initWandering();

  console.log("end vuejs stuff");
};
