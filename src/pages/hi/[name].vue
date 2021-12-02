<template>
  <div>
    <div>
      <icon-carbon-pedestrian />
    </div>
    <p>
      Hi, {{ props.name }}
    </p>
    <p>
      <em>Dynamic route!</em>
    </p>

    <div>
      <button
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{ name: string }>()
const router = useRouter()
</script>
