<template>
  <div class="routes">
    <router-link v-for="route of allRoutes" :key="route.name" :to="route">
      {{ route.name }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue-demi';

const name = ref('');

const router = useRouter();
const allRoutes = router.options.routes;
</script>

<style lang="scss" scoped>
.routes {
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
}
</style>
