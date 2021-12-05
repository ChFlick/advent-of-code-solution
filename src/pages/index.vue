<template>
  <h1>Advent of Code Solutions & Solver</h1>

  <h2>Puzzles</h2>
  <div class="routes">
    <router-link v-for="route of solutionRoutes" :key="route.name" :to="route">
      {{ route.path.split("/")[2] }} - {{ route.path.split("/")[3] }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue-demi';

const name = ref('');

const router = useRouter();
const solutionRoutes = router.options.routes.filter(route => /^\/solutions\/\d{4}\/\d{2}$/.test(route.path));
</script>

<style lang="scss" scoped>
.routes {
  display: flex;
  flex-direction: column;
  margin-bottom: 2em  ;
}
</style>
