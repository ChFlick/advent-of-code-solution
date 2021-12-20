<template>
  <SolutionPage
    year="2021"
    day="11"
    :initial-input="input"
    :solution="solution"
    notice="Solved in Go with WebAssembly"
  />
</template>
<script setup lang="ts">
import { onDeactivated } from 'vue-demi';
import { input } from './input';
import { solution } from './solution';
import SolutionPage from '@/components/SolutionPage.vue';

// @ts-ignore
const go = new Go();
WebAssembly.instantiateStreaming(fetch('/wasm/11.wasm'), go.importObject)
  .then((result) => {
    go.run(result.instance);
  })
  .catch((err) => {
    console.error(err);
  });

onDeactivated(() => {
  eleven_kill();
  go.exit();
});
</script>
