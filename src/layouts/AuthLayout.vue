<template>
  <div class="auth-layout">
    <horizontal-container>
      <vertical-container id="logo">
        <app-logo logo="white"/>
        <guest-quote :quote="quote.quote" :author="quote.author" size="large"/>
      </vertical-container>
      <vertical-container id="form">
        <slot/>
        <app-license/>
      </vertical-container>
    </horizontal-container>
  </div>
</template>

<script>
import HorizontalContainer from '@/components/HorizontalContainer'
import VerticalContainer from '@/components/VerticalContainer'
import AppLogo from '@/components/AppLogo'
import GuestQuote from '@/components/guest/GuestQuote'
import AppLicense from '@/components/AppLicense'

export default {
  components: {
    HorizontalContainer, VerticalContainer, AppLogo, GuestQuote, AppLicense
  },
  computed: {
    quote() {
      return this.$store.getters.randomQuote
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.auth-layout {
  width: 100%;
  height: 100%;
  #logo {
    width: 70%;
    @media screen and (max-width: 1200px) {
      width: 50%;
      .guest-quote {
        max-width: 70%;
      }
    }
    @media screen and (max-width: 700px) {
      display: none;
    }
  }
  #form {
    width: 30%;
    background: white;
    color: $main-color;
    @media screen and (max-width: 1200px) {
      width: 50%;
    }
    @media screen and (max-width: 700px) {
      width: 100%;
    }
    .app-license {
      position: absolute;
      bottom: 10px;
      @media screen and (max-height: 800px) {
        position: relative;
      }
    }
  }
}
</style>
