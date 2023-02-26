import { createApp } from "vue";
import Counter from "./vuejs/Counter.vue";

import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faCircleNotch);
library.add(faPlus);

export const initVueJs = () => {
  console.log("init vuejs stuff");

  createApp(Counter)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .mount(".gradient .btn1");

  createApp(() => <Counter canDisable={true} />)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .mount(".gradient .btn2");

  createApp(() => <Counter canDisable={true} showSpinner={true} />)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .mount(".gradient .btn3");

  createApp(() => (
    <Counter canDisable={true} showSpinner={true} showProgress={true} />
  ))
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .mount(".gradient .btn4");

  createApp(() => (
    <Counter
      canDisable={true}
      showSpinner={true}
      showProgress={true}
      goalGradientEffect={true}
    />
  ))
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .mount(".gradient .btn5");

  console.log("end vuejs stuff");
};
