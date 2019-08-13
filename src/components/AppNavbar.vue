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
          <search-input name="search"/>
        </li>
      </ul>
      <ul class="navbar-right">
        <li class="navbar-item">
          <a>
            <font-awesome-icon icon="paper-plane" size="lg"/>
          </a>
        </li>
        <li class="navbar-item">
          <a>
            <font-awesome-icon icon="user-circle" size="lg"/>
          </a>
        </li>
        <li class="navbar-item">
          <a>
            <font-awesome-icon icon="bell" size="lg"/>
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
        .navbar-item {
          display: inline;
          margin: 0 10px;
        }
      }
    }
  }
</style>
