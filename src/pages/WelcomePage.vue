<template>
  <div class="welcome-page">
    <vertical-container>
      <app-logo logo="white"/>
      <guest-quote :quote="quote.quote" :author="quote.author" size="large"/>
      <search-input placeholder="Votre email ou pseudo ..." icon="arrow-right" @search="findUser"/>
      <app-license/>
    </vertical-container>
  </div>
</template>

<script>
import VerticalContainer from '@/components/VerticalContainer'
import AppLogo from '@/components/AppLogo'
import GuestQuote from '@/components/guest/GuestQuote'
import SearchInput from '@/components/utils/inputs/SearchInput'
import AppLicense from '@/components/AppLicense'

export default {
  components: {
    VerticalContainer, AppLogo, GuestQuote, SearchInput, AppLicense
  },
  computed: {
    quote() {
      return this.$store.getters.randomQuote
    }
  },
  methods: {
    findUser(query) {
      this.$store.dispatch('findUser', query).then(() => {
        this.$router.push('login')
      }).catch(() => {
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
  .app-logo {
    @media screen and (max-height: 700px) {
      width: 200px;
    }
  }
  .guest-quote {
    max-width: 45%;
  }
  .search-input {
    margin-top: 5%;
  }
  .app-license {
    position: absolute;
    bottom: 10px;
    @media screen and (max-height: 700px) {
      position: relative;
    }
  }
}
</style>
