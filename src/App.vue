<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MasterLayout from '@/layouts/Master.vue'
import WelcomeLayout from '@/layouts/Welcome.vue'

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

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
