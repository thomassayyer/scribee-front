<template>
  <div class="welcome-page">
    <vertical-container>
      <app-logo logo="white"/>
      <welcome-quote :quote="quote.quote" :author="quote.author" size="large"/>
      <search-input name="pseudo" placeholder="Votre email ou pseudo ..." icon="arrow-right" @search="search"/>
    </vertical-container>
  </div>
</template>

<script>
import VerticalContainer from '@/components/VerticalContainer.vue'
import AppLogo from '@/components/AppLogo.vue'
import WelcomeQuote from '@/components/WelcomeQuote.vue'
import SearchInput from '@/components/SearchInput.vue'

export default {
  components: {
    VerticalContainer, AppLogo, WelcomeQuote, SearchInput
  },
  computed: {
    quote() {
      return this.$store.state.quotes[Math.floor(Math.random()*this.$store.state.quotes.length)]
    }
  },
  methods: {
    search(entry) {
      // TODO: search a user by input using the store.
    }
  }
}
</script>

<style lang="scss" scoped>
  .welcome-page {
    color: white;
    width: 100%;
    height: 100%;
    .app-logo {
      max-width: 250px;
    }
    .welcome-quote {
      max-width: 45%;
      min-width: 300px;
    }
    .search-input {
      margin-top: 5%;
    }
  }
</style>
