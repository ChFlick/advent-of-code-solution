<template>
  <div>
    <button @click="$router.back()">
      Back
    </button>

    <h1>Solution for {{ props.year }} - {{ props.day }}</h1>

    <label class="textarea">
      <span class="label"><icon-carbon-data-table-reference />Input</span>
      <textarea id="input" v-model="input" name="input" rows="10" />
    </label>

    <div>
      <button @click="runBoth">
        Run
      </button>
      <button @click="benchmarkBoth">
        Benchmark
      </button>
    </div>
    <br>

    <label>
      <span class="label">Solution for #1</span>
      <input id="result_1" disabled :value="firstResult" type="text" name="result_1">
    </label>
    <label>
      <span class="label">Benchmark (ms) for #1</span>
      <input id="benchmark_1" disabled :value="firstBenchmark" type="text" name="benchmark_1">
    </label>
    <div>
      <button @click="runFirst">
        Run #1
      </button>
      <button @click="benchmarkFirst">
        Benchmark #1
      </button>
    </div>

    <label>
      <span class="label">Solution for #2</span>
      <input id="result_2" disabled :value="secondResult" type="text" name="result_2">
    </label>
    <label>
      <span class="label">Benchmark (ms) for #2</span>
      <input id="benchmark_2" disabled :value="secondBenchmark" type="text" name="benchmark_2">
    </label>
    <div>
      <button @click="runSecond">
        Run #2
      </button>
      <button @click="benchmarkSecond">
        Benchmark #2
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue-demi';
import { Solution } from '@/solutions/Solution.interface';

const props = defineProps<{
  year: string
  day: string
  initialInput: string
  solution: Solution
}>();

const input = ref(props.initialInput);

const firstResult = ref('');
const secondResult = ref('');

const firstBenchmark = ref(0);
const secondBenchmark = ref(0);

async function runBoth() {
  await Promise.all([
    runFirst(),
    runSecond(),
  ]);
}

async function benchmarkBoth() {
  await Promise.all([
    benchmarkFirst(),
    benchmarkSecond(),
  ]);
}

async function runFirst() {
  return new Promise((resolve, reject) => {
    try {
      firstResult.value = `${props.solution.first(input.value.trim())}`;
      resolve(firstResult.value);
    }
    catch (error) {
      reject(error);
    }
  });
}

function benchmarkFirst() {
  return new Promise((resolve, reject) => {
    try {
      const t1 = performance.now();
      for (let i = 0; i < 10000; i++) {
        props.solution.first(input.value.trim());
      }

      const t2 = performance.now();
      firstBenchmark.value = t2 - t1;
      resolve(firstBenchmark.value);
    }
    catch (error) {
      reject(error);
    }
  });
}

function runSecond() {
  return new Promise((resolve, reject) => {
    try {
      secondResult.value = `${props.solution?.second?.(input.value.trim())}` ?? '';
      resolve(secondResult.value);
    }
    catch (error) {
      reject(error);
    }
  });
}

function benchmarkSecond() {
  return new Promise((resolve, reject) => {
    try {
      const t1 = performance.now();
      for (let i = 0; i < 10000; i++) {
        props.solution?.second?.(input.value.trim());
      }

      const t2 = performance.now();
      secondBenchmark.value = t2 - t1;
      resolve(secondBenchmark.value);
    }
    catch (error) {
      reject(error);
    }
  });
}
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  column-gap: 0.5em;
}

.textarea {
  width: 100%;
}
</style>
