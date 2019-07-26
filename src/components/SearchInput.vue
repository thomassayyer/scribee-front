<template>
  <div class="search-input">
    <input type="text" :name="name" :placeholder="placeholder" v-model="value"/>
    <a @click="search"><font-awesome-icon :icon="icon"/></a>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Votre valeur ...'
    },
    icon: {
      type: String,
      required: false,
      default: 'search'
    }
  },
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    search() { this.$emit('search', this.value) }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/color.scss';
  
  .search-input {
    input {
      border: 1px solid $secondary-color;
      border-radius: 20px;
      outline: 0;
      padding: 10px 20px;
      min-width: 200px;
      &:focus {
        border-color: $main-color;
      }
    }
    a {
      margin-left: 10px;
    }
  }
</style>
