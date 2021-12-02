<template>
  <main>
    <router-view />
    <Footer />
  </main>
</template>
<script>
import { defineComponent } from 'vue-demi'
import Footer from './components/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Footer,
  },
})
</script>
