<template>
  <div class="video-background">
    <video autoplay muted loop preload="auto" ref="video">
      <source :src="require('@/assets/videos/'+src)" :type="getMediaType(src)"/>
    </video>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    brightness: {
      type: Number,
      required: false,
      default: 100
    }
  },
  methods: {
    getMediaType(src) {
      return 'video/'+src.split('.').pop()
    }
  },
  mounted() {
    this.$refs.video.style.filter = `brightness(${this.brightness}%)`
  }
}
</script>


<style lang="scss" scoped>
.video-background {
  z-index: -100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
