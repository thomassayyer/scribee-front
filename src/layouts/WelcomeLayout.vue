<template>
  <div class="welcome-layout">
    <video-background src="honey.mp4" :brightness="60"/>
    <slot/>
  </div>
</template>

<script>
import VideoBackground from '@/components/VideoBackground.vue'

export default {
  components: {
    VideoBackground
  }
}
</script>

<style lang="scss" scoped>
  .welcome-layout {
    width: 100%;
    height: 100%;
  }
</style>

