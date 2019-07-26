<template>
  <div class="app-logo">
    <img :src="src" alt="App logo"/>
  </div>
</template>

<script>
export default {
  props: {
    logo: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  computed: {
    src() {
      if (this.logo == 'white') return require('@/assets/logos/white.png')
      return require('@/assets/logos/default.png')
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
  }
</style>
