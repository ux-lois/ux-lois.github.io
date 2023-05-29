<script lang="ts" setup>
import { sleep } from "@/misc";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted, ref } from "vue";

const goalgradient = (n: number): number => {
  return -Math.pow(n - 1, 8) + 1;
};

const button = ref<HTMLElement>();

const props = defineProps({
  canDisable: {
    type: Boolean,
    default: false,
  },
  showSpinner: {
    type: Boolean,
    default: false,
  },
  showProgress: {
    type: Boolean,
    default: false,
  },
  goalGradientEffect: {
    type: Boolean,
    default: false,
  },
});

// reactive state
const count = ref(0);

const isRunning = ref(false);

// functions that mutate state and trigger updates
const increment = async () => {
  if (!button.value) {
    return;
  }
  if (isRunning.value) {
    return;
  }

  isRunning.value = true;
  const delay = 5000;
  const sample = 15;
  const total = delay / sample;
  for (let i = 0; i < total; i++) {
    const percent = props.goalGradientEffect
      ? (100 * goalgradient(i / total)).toFixed(2)
      : ((100 * i) / total).toFixed(2);
    if (props.showProgress) {
      button.value.style.background = `linear-gradient(90deg, rgba(0,0,0,0.3) ${percent}%, rgba(255,255,255,1) ${percent}%)`;
    }
    await sleep(sample);
  }
  button.value.style.background = "";

  count.value++;
  isRunning.value = false;
};

// lifecycle hooks
onMounted(() => {});
</script>

<template>
  <button ref="button" @click="increment" :disabled="canDisable && isRunning">
    <FontAwesomeIcon
      v-if="showSpinner && isRunning"
      icon="fa-solid fa-circle-notch"
      :spin="true"
    />
    <FontAwesomeIcon v-else icon="fa-solid fa-plus" />
    Ma valeur est : {{ count }}
  </button>
</template>
