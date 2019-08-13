<template>
  <div class="master-layout">
    <app-navbar/>
    <div class="wrapper">
      <div class="background"></div>
      <div class="page">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar'

export default {
  components: {
    AppNavbar
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/color.scss';

  .master-layout {
    .wrapper {
      .background {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: -2;
        background: $light-background-color;
      }
      .page {
        text-align: center;
        padding: 100px 0 20px 0;
      }
    }
  }
</style>
