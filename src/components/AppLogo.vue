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
      return require('@/assets/logos/' + (this.logo || 'default') + '.png')
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-logo {
    max-width: 250px;
    img {
      width: 100%;
    }
  }
</style>
