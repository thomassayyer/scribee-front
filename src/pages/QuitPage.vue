<template>
  <div class="quit-page">
    <vertical-container>
      <h2>Êtes-vous certains de vouloir <strong>quitter {{ appName }}</strong> ?</h2>
      TODO
    </vertical-container>
  </div>
</template>

<script>
import VerticalContainer from '@/components/VerticalContainer'

export default {
  components: {
    VerticalContainer
  },
  computed: {
    appName() {
      return this.$store.state.appName
    }
  }
}
</script>
