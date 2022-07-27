<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  initial: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["change"]);

const count = ref(props.initial || 0);

const increment = () => {
  count.value++;
  emit("change", count.value);
};

const decrement = () => {
  count.value--;
  emit("change", count.value);
};
</script>

<template>
  <div>
    <button aria-label="decrement" @click="decrement">-</button>
    <span data-cy="counter">{{ count }}</span>
    <button aria-label="increment" @click="increment">+</button>

    <div aria-label="context">
      <slot />
      <br />
      <slot name="footer"></slot>
    </div>
  </div>
</template>
