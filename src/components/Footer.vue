<template>
  <nav>
    <button @click="toggleDark()">
      <div v-if="isDark">
        <icon-carbon-moon />
      </div>
      <div v-else>
        <icon-carbon-sun />
      </div>
    </button>

    <a
      class="icon-btn"
      rel="noreferrer"
      href="https://github.com/antfu/vitesse-lite"
      target="_blank"
      title="GitHub"
    >
      <icon-carbon-logo-github />
    </a>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { isDark, toggleDark } from '@/composables'

export default defineComponent({
  setup() {
    return {
      isDark,
      toggleDark,
    }
  },
})
</script>
