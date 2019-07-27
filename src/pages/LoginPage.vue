<template>
  <div class="login-page">
    <horizontal-container>
      <vertical-container id="logo">
        <app-logo logo="white"/>
        <welcome-quote :quote="quote.quote" :author="quote.author" size="large"/>
      </vertical-container>
      <vertical-container id="form">
        <login-form :name="name" :pseudo="pseudo" @submit="login"></login-form>
      </vertical-container>
    </horizontal-container>
  </div>
</template>

<script>
import HorizontalContainer from '@/components/HorizontalContainer'
import VerticalContainer from '@/components/VerticalContainer'
import AppLogo from '@/components/AppLogo'
import WelcomeQuote from '@/components/WelcomeQuote'
import LoginForm from '@/components/auth/LoginForm'

export default {
  components: {
    HorizontalContainer, VerticalContainer, AppLogo, WelcomeQuote, LoginForm
  },
  computed: {
    name() {
      return this.$store.state.user.name
    },
    pseudo() {
      return this.$store.state.user.pseudo
    },
    quote() {
      return this.$store.getters.randomQuote
    }
  },
  methods: {
    login(credentials) {
      // TODO: Authenticate the user
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/color.scss';

  .login-page {
    width: 100%;
    height: 100%;
    #logo {
      width: 70%;
      @media screen and (max-width: 1200px) {
        width: 50%;
        .welcome-quote {
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
    }
  }
</style>
