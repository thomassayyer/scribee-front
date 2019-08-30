<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MasterLayout from '@/layouts/MasterLayout'
import GuestLayout from '@/layouts/GuestLayout'

export default {
  components: {
    MasterLayout, GuestLayout
  },
  computed: {
    layout() {
      return (this.$store.getters.loggedIn ? "master" : "guest") + "-layout"
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/typography.scss';

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  a, button {
    cursor: pointer;
  }
}
</style>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
