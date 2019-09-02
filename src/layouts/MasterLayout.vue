<template>
  <div class="master-layout">
    <app-navbar @publish="publishText" @search="exploreCommunity" @select="exploreCommunity"/>
    <div class="background"></div>
    <vertical-container class="wrapper">
      <search-input @select="exploreCommunity"/>
      <div class="page">
        <slot/>
        <app-license/>
      </div>
    </vertical-container>
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar'
import VerticalContainer from '@/components/VerticalContainer'
import SearchInput from '@/components/utils/inputs/SearchInput'
import AppLicense from '@/components/AppLicense'
import { bus } from '@/bus'

export default {
  components: {
    AppNavbar, VerticalContainer, SearchInput, AppLicense
  },
  methods: {
    exploreCommunity(pseudo) {
      this.$router.push({
        name: 'community',
        params: { pseudo }
      })
    },
    publishText(text) {
      this.$store.dispatch('publishText', text).then(createdText => {
        this.$router.push({
          name: 'community',
          params: { pseudo: createdText.community_pseudo }
        })
        bus.$emit('text-published', createdText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.master-layout {
  .background {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -2;
    background: $light-background-color;
  }
  .wrapper {
    padding: 120px 0 20px 0;
    @media screen and (max-width: 500px) {
      padding-top: 140px;
    }
    .search-input {
      margin-bottom: 20px;
      @media screen and (min-width: 900px) {
        display: none;
      }
    }
    .page {
      width: 100%;
    }
  }
}
</style>
