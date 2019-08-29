<template>
  <div class="master-layout">
    <publish-modal v-if="isPublishModalShown" @close="hidePublishModal" @submit="publishText"/>
    <app-navbar @publish="showPublishModal" @search="openCommunity" @select="openCommunity"/>
    <div class="background"></div>
    <vertical-container class="wrapper">
      <search-input name="search" @select="openCommunity"/>
      <div class="page">
        <slot/>
        <app-license/>
      </div>
    </vertical-container>
  </div>
</template>

<script>
import PublishModal from '@/components/utils/modals/PublishModal'
import AppNavbar from '@/components/AppNavbar'
import VerticalContainer from '@/components/VerticalContainer'
import SearchInput from '@/components/utils/inputs/SearchInput'
import AppLicense from '@/components/AppLicense'

export default {
  components: {
    PublishModal, AppNavbar, VerticalContainer, SearchInput, AppLicense
  },
  data() {
    return {
      isPublishModalShown: false
    }
  },
  methods: {
    showPublishModal() {
      this.isPublishModalShown = true
    },
    hidePublishModal() {
      this.isPublishModalShown = false
    },
    openCommunity(pseudo) {
      this.$router.push({
        name: 'community',
        params: { pseudo }
      })
    },
    publishText(text) {
      this.$store.dispatch('publishText', text).then(() => {
        this.hidePublishModal()
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
    @media screen and (max-width: 610px) {
      padding-top: 140px;
    }
    .search-input {
      margin-bottom: 20px;
      @media screen and (min-width: 970px) {
        display: none;
      }
    }
    .page {
      width: 100%;
    }
  }
}
</style>
