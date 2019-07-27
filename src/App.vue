<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MasterLayout from '@/layouts/MasterLayout'
import WelcomeLayout from '@/layouts/WelcomeLayout'

export default {
  components: {
    MasterLayout, WelcomeLayout
  },
  computed: {
    layout() {
      return (this.$store.getters.loggedIn ? "master" : "welcome") + "-layout"
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
}
</style>
