<template>
  <div>
    <button @click="$router.push({name: 'Home'})">
      Home
    </button>
    <button @click="$router.push(previousPuzzlePath)">
      Previous Puzzle
    </button>
    <button @click="$router.push(nextPuzzlePath)">
      Next Puzzle
    </button>

    <h1>Solution for {{ props.year }} - {{ props.day }}</h1>
    <p v-if="notice">
      {{ notice }}
    </p>

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

    <label>
      <span class="label">Benchmark Runs</span>
      <input id="benechmarkRuns" v-model="benchmarkRuns" type="number" name="benechmarkRuns">
    </label>
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
  notice?: string
}>();

const input = ref(props.initialInput);

const firstResult = ref('');
const secondResult = ref('');

const firstBenchmark = ref(0);
const secondBenchmark = ref(0);

const benchmarkRuns = ref(props.solution.benchmarkRuns ?? 1000);

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
  const result = await props.solution.first(input.value.trim());
  firstResult.value = result.toString();
  return result.toString();
}

async function benchmarkFirst() {
  const t1 = performance.now();
  for (let i = 0; i < benchmarkRuns.value; i++) {
    await props.solution.first(input.value.trim());
  }

  const t2 = performance.now();
  firstBenchmark.value = t2 - t1;

  return firstBenchmark.value;
}

async function runSecond() {
  const result = await props.solution?.second?.(input.value.trim()) ?? '';
  secondResult.value = result.toString();
  return result.toString();
}

async function benchmarkSecond() {
  const t1 = performance.now();
  for (let i = 0; i < benchmarkRuns.value; i++) {
    await props.solution?.second?.(input.value.trim());
  }

  const t2 = performance.now();
  secondBenchmark.value = t2 - t1;

  return secondBenchmark.value;
}

const day = parseInt(props.day);
const year = parseInt(props.year);
const previousPuzzlePath = (day === 1) ? `/solutions/${year - 1}/25` : `/solutions/${year}/${(day - 1).toString().padStart(2, '0')}`;
const nextPuzzlePath = (day === 25) ? `/solutions/${year + 1}/01` : `/solutions/${year}/${(day + 1).toString().padStart(2, '0')}`;
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
