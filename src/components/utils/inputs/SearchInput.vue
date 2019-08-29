<template>
  <div class="search-input">
    <text-input :name="name" :placeholder="placeholder" :value="value" v-model="query" @keyup="updateResults" @keyup.enter="search"/>
    <a class="search-link" @click="search" v-if="icon"><font-awesome-icon :icon="icon"/></a>
    <ul class="results" v-if="results.length">
      <li v-for="result in results" :key="result.key">
        <a @click="select(result.key)">
          <strong>{{ result.key }}</strong> - {{ result.value }}
        </a>
      </li>
    </ul>
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
    },
    autocomplete: {
      type: Function,
      required: false
    }
  },
  components: {
    TextInput, FontAwesomeIcon
  },
  data() {
    return {
      query: '',
      results: [ ]
    }
  },
  methods: {
    search() {
      this.$emit('search', this.query)
    },
    updateResults() {
      if (this.autocomplete && this.query.length > 2) {
        this.autocomplete(this.query).then(results => {
          this.results = results
        }).catch(() => {
          this.results = [ ]
        })
      }
    },
    select(key) {
      this.results = [ ]
      this.query = key
      this.$emit('select', this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.search-input {
  .text-input {
    display: inline;
  }
  .search-link {
    margin-left: 10px;
  }
  .results {
    list-style-type: none;
    border: 1px solid $secondary-color;
    border-radius: 10px;
    padding: 10px 20px;
    margin-top: 10px;
    position: absolute;
    background: white;
    li {
      margin: 10px 0;
    }
  }
}
</style>
