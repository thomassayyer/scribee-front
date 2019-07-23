<template>
  <div>
    <video-background/>
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
