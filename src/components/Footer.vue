<template>
  <nav class="footer">
    <a
      class="icon-btn"
      rel="noreferrer"
      href="https://github.com/ChFlick/advent-of-code-solutions"
      target="_blank"
      title="Source Code on GitHub"
    >
      <span class="nav-text"><icon-carbon-logo-github />Source Code</span>
    </a>
    <a
      rel="noreferrer"
      href="https://adventofcode.com/"
      target="_blank"
      title="Advent of Code"
    >
      Advent of Code
    </a>

    <button @click="toggleDark()">
      <div v-if="isDark">
        <icon-carbon-moon />
      </div>
      <div v-else>
        <icon-carbon-sun />
      </div>
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import { isDark, toggleDark } from '@/composables';

export default defineComponent({
  setup() {
    return {
      isDark,
      toggleDark,
    };
  },
});
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 30px;
  align-items: center;
}

.nav-text {
  display: flex;
  gap: 0.5em;
}
</style>
