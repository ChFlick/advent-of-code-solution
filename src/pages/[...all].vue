<template>
  <div class="center">
    <div>
      Not Found
    </div>

    <button @click="$router.back()">
      Back
    </button>
  </div>
</template>

<style scoped>
  .center {
    height: 50vh ;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
