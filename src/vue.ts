import { createApp } from "vue";
import Counter from "./vuejs/Counter.vue";

export const initVueJs = () => {
  console.log("init vuejs stuff");

  createApp(Counter).mount(".gradient .btn1");
};
