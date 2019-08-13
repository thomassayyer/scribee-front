<template>
  <div class="search-input">
    <text-input :name="name" :placeholder="placeholder" :value="value" v-model="query" @keyup.enter="search"/>
    <a @click="search"><font-awesome-icon :icon="icon"/></a>
  </div>
</template>

<script>
import TextInput from './TextInput'
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
      default: 'Rechercher ...'
    },
    value: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false,
      default: 'search'
    }
  },
  components: {
    TextInput, FontAwesomeIcon
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    search() { this.$emit('search', this.query) }
  }
}
</script>

<style lang="scss" scoped>
  .search-input {
    .text-input {
      display: inline;
    }
    a {
      margin-left: 10px;
    }
  }
</style>
