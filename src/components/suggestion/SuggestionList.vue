<template>
  <div class="suggestion-list">
    <ul class="list">
      <li class="list-item" v-for="suggestion in suggestions" :key="suggestion.id">
        <p v-if="isPseudoDisplayed(suggestion)" class="user-pseudo">{{ suggestion.user.pseudo }}</p>
        <p :class="originalTextClass(suggestion)">{{ suggestion.original }}</p>
        <p v-if="suggestion.suggestion" class="update monospace">{{ suggestion.suggestion }}</p>
        <horizontal-container v-if="!expose">
          <a v-if="ownText && canAccept" @click="$emit('accept', suggestion)">
            <font-awesome-icon icon="check" />
          </a>
          <a @click="$emit('reject', suggestion)">
            <font-awesome-icon icon="times" />
          </a>
        </horizontal-container>
        <hr class="separator"/>
      </li>
    </ul>
  </div>
</template>

<script>
import HorizontalContainer from '@/components/HorizontalContainer'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  props: {
    suggestions: {
      required: true,
      type: Array
    },
    ownText: {
      required: false,
      type: Boolean,
      default: false
    },
    expose: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  components: {
    HorizontalContainer, FontAwesomeIcon
  },
  computed: {
    canAccept() {
      return this.$store.getters.user.score > 0
    }
  },
  methods: {
    originalTextClass(suggestion) {
      return 'original monospace ' + (suggestion.suggestion ? '' : 'remove')
    },
    isPseudoDisplayed(suggestion) {
      if (!suggestion.user) {
        return false
      }
      return suggestion.user.pseudo !== this.$store.getters.user.pseudo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.suggestion-list {
  .list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .list-item {
      min-width: 200px;
      p {
        margin: 0;
        &.user-pseudo {
          margin-bottom: 20px;
        }
        &.original {
          color: $secondary-color;
          text-decoration: line-through;
          &.remove {
            color: $danger-color;
          }
        }
        &.update {
          margin-top: 10px;
          color: $success-color;
        }
      }
      .horizontal-container {
        margin-top: 20px;
        a {
          margin: 0 5px;
        }
      }
      .separator {
        margin: 20px 0;
      }
    }
  }
}
</style>
