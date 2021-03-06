<template>
  <div class="app-navbar">
    <publish-text-modal v-if="isPublishTextModalShown" @close="hidePublishTextModal" @submit="$emit('publish', $event)"/>
    <div class="navbar">
      <ul class="navbar-left">
        <li class="navbar-item">
          <router-link :to="{ name: 'home' }">
            <app-logo logo="small"/>
          </router-link>
        </li>
        <li :class="homeClass">
          <router-link :to="{ name: 'home' }">Accueil</router-link>
        </li>
        <li :class="exploreClass">
          <router-link :to="{ name: 'explore' }">Explorer</router-link>
        </li>
      </ul>
      <ul class="navbar-center">
        <li class="navbar-item">
          <search-input :autocomplete="autocomplete" @search="$emit('search', $event)" @select="$emit('select', $event)"/>
        </li>
      </ul>
      <ul class="navbar-right">
        <li class="navbar-item">
          <a @click="showPublishTextModal">
            <font-awesome-icon icon="paper-plane" size="lg"/>
          </a>
        </li>
        <li class="navbar-item">
          <font-awesome-icon :icon="scoreIcon" size="lg"/>&nbsp;
          <strong>{{ score }}</strong>
        </li>
        <li class="navbar-item">
          <router-link :to="{ name: 'logout' }">
            <font-awesome-icon icon="power-off" size="lg"/>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PublishTextModal from '@/components/utils/modals/PublishTextModal'
import AppLogo from './AppLogo';
import SearchInput from './utils/inputs/SearchInput'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { bus } from '@/bus'

export default {
  components: {
    PublishTextModal, AppLogo, SearchInput, FontAwesomeIcon
  },
  computed: {
    homeClass() {
      return this.$route.name === 'home' ? 'navbar-item active' : 'navbar-item'
    },
    exploreClass() {
      return this.$route.name === 'explore' ? 'navbar-item active' : 'navbar-item'
    },
    score() {
      return this.$store.getters.user.score
    },
    scoreIcon() {
      if (this.score >= 20) {
        return 'thermometer-full'
      }
      if (this.score >= 15) {
        return 'thermometer-three-quarters'
      }
      if (this.score >= 10) {
        return 'thermometer-half'
      }
      if (this.score >= 5) {
        return 'thermometer-quarter'
      }
      return 'thermometer-empty'
    }
  },
  data() {
    return {
      isPublishTextModalShown: false
    }
  },
  methods: {
    showPublishTextModal() {
      this.isPublishTextModalShown = true
    },
    hidePublishTextModal() {
      this.isPublishTextModalShown = false
    },
    autocomplete(query) {
      return this.$store.dispatch('autocompleteCommunities', query)
    }
  },
  created() {
    bus.$on('text-published', this.hidePublishTextModal)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.app-navbar {
  border-bottom: 1px solid $secondary-color;
  background: white;
  color: $main-color;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  .navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
    ul {
      margin: 15px 40px;
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      &.navbar-left {
        .app-logo {
          width: 30px;
        }
        .navbar-item {
          &.active {
            a {
              color: $main-color;
            }
          }
          a {
            color: $secondary-color;
          }
        }
      }
      &.navbar-center {
        @media screen and (max-width: 900px) {
          display: none;
        }
      }
      &.navbar-right {
        @media screen and (max-width: 500px) {
          margin-top: 0;
        }
      }
      .navbar-item {
        display: inline;
        margin: 0 10px;
        a {
          color: $main-color;
        }
      }
    }
  }
}
</style>
