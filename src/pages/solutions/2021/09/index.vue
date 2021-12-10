<template>
  <SolutionPage
    year="2021"
    day="09"
    :initial-input="input"
    :solution="solution"
  />
</template>
<script setup lang="ts">
import { input } from './input';
import { solution } from './solution';
import SolutionPage from '@/components/SolutionPage.vue';
</script>
