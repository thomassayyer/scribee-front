<template>
  <div class="background-video">
    <video autoplay muted loop preload="true">
      <source src="@/assets/bg.mp4" type="video/mp4">
    </video>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.background-video {
  z-index: -1000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
