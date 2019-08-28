<template>
  <div class="app-navbar">
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
          <search-input name="community" :autocomplete="autocomplete" @search="$emit('search', $event)" @select="$emit('select', $event)"/>
        </li>
      </ul>
      <ul class="navbar-right">
        <li class="navbar-item">
          <a @click="$emit('publish')">
            <font-awesome-icon icon="paper-plane" size="lg"/>
          </a>
        </li>
        <li class="navbar-item">
          <font-awesome-icon icon="user-circle" size="lg"/>&nbsp;
          {{ pseudo }}&nbsp;
          <a @click="logout">
            <font-awesome-icon icon="power-off"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AppLogo from './AppLogo';
import SearchInput from './utils/inputs/SearchInput'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    AppLogo, SearchInput, FontAwesomeIcon
  },
  computed: {
    homeClass() {
      return this.$route.name === 'home' ? 'navbar-item active' : 'navbar-item'
    },
    exploreClass() {
      return this.$route.name === 'explore' ? 'navbar-item active' : 'navbar-item'
    },
    pseudo() {
      return this.$store.state.user.pseudo
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').finally(() => {
        this.$router.push({ name: 'welcome' })
      })
    },
    autocomplete(query) {
      return this.$store.dispatch('autocompleteCommunities', query)
    }
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
    .navbar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      @media screen and (max-width: 600px) {
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
          @media screen and (max-width: 950px) {
            display: none;
          }
        }
        &.navbar-right {
          @media screen and (max-width: 600px) {
            margin-top: 0;
          }
        }
        .navbar-item {
          display: inline;
          margin: 0 10px;
        }
      }
    }
  }
</style>
