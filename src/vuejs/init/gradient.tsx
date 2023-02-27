import { getUxLawState } from "@/misc";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";

import Counter from "../components/Counter.vue";

export const initGradient = () => {
  const uxLawState = getUxLawState();
  if (uxLawState === undefined) {
    return;
  }
  if (uxLawState.page.class !== "gradient") {
    return;
  }

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
};
