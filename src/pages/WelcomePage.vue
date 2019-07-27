<template>
  <div class="welcome-page">
    <vertical-container>
      <app-logo logo="white"/>
      <welcome-quote :quote="quote.quote" :author="quote.author" size="large"/>
      <search-input name="pseudo" placeholder="Votre email ou pseudo ..." icon="arrow-right" @search="findUser"/>
    </vertical-container>
  </div>
</template>

<script>
import VerticalContainer from '@/components/VerticalContainer'
import AppLogo from '@/components/AppLogo'
import WelcomeQuote from '@/components/WelcomeQuote'
import SearchInput from '@/components/SearchInput'

export default {
  components: {
    VerticalContainer, AppLogo, WelcomeQuote, SearchInput
  },
  computed: {
    quote() {
      return this.$store.getters.randomQuote
    }
  },
  methods: {
    findUser(query) {
      this.$store.dispatch('findUser', query).then(user => {
        this.$router.push('login')
      }).catch(error => {
        this.$router.push('register')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .welcome-page {
    width: 100%;
    height: 100%;
    .welcome-quote {
      max-width: 45%;
    }
    .search-input {
      margin-top: 5%;
    }
  }
</style>
