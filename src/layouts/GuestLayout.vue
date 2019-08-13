<template>
  <div class="guest-layout">
    <video-background src="bg.mp4" :brightness="70" credits="Pixabay"/>
    <auth-layout v-if="auth"><slot/></auth-layout>
    <slot v-else/>
  </div>
</template>

<script>
import VideoBackground from '@/components/guest/VideoBackground'
import AuthLayout from './AuthLayout'

export default {
  components: {
    VideoBackground, AuthLayout
  },
  computed: {
    auth() {
      return this.$route.name === 'login' || this.$route.name === 'register'
    }
  }
}
</script>

<style lang="scss" scoped>
  .guest-layout {
    width: 100%;
    height: 100%;
    color: white;
  }
</style>
