<template>
  <div class="logout-page"></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('logout').finally(() => {
      this.$router.push({ name: 'welcome' })
    })
  }
}
</script>