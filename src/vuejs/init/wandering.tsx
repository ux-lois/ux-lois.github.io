import { getUxLawState } from "@/misc";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";

import Counter from "../components/Counter.vue";

export const initWandering = () => {
  const uxLawState = getUxLawState();
  if (uxLawState === undefined) {
    return;
  }
  if (uxLawState.page.class !== "wandering") {
    return;
  }

  createApp(Counter)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .mount(".wandering .btn1");
};
