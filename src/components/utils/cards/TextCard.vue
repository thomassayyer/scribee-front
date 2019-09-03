<template>
  <div class="text-card">
    <text-modal v-if="isTextModalShown" :author="author" :community="community" :text="text" :updated-at="updatedAt" :suggestions="suggestions" @close="hideTextModal" @send-suggestions="$emit('send-suggestions', $event)" @accept-suggestion="$emit('accept-suggestion', $event)" @reject-suggestion="$emit('reject-suggestion', $event)" @remove="$emit('remove')"/>
    <card-base :color="color">
      <h3 slot="header" class="header">
        {{ author.name }}&nbsp;<span class="author-pseudo">{{ author.pseudo }}</span>
        <br/>
        <small>Dans {{ community.pseudo }}, {{ formattedUpdatedAt }}</small>
      </h3>
      <div slot="content" class="content">
        <p class="text monospace">{{ cutText }}</p>
        <default-button color="primary" @click="showTextModal">Consulter</default-button>
      </div>
    </card-base>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/fr'
import TextModal from '@/components/utils/modals/TextModal'
import CardBase from './CardBase'
import DefaultButton from '@/components/utils/buttons/DefaultButton'
import { bus } from '@/bus'

export default {
  props: {
    author: {
      required: true,
      type: Object
    },
    community: {
      required: true,
      type: Object
    },
    text: {
      required: true,
      type: String
    },
    updatedAt: {
      required: true,
      type: Date
    },
    suggestions: {
      required: true,
      type: Array
    },
    color: {
      required: false,
      type: String,
      default: 'light'
    }
  },
  components: {
    TextModal, CardBase, DefaultButton
  },
  computed: {
    formattedUpdatedAt() {
      return moment(this.updatedAt).fromNow()
    },
    cutText() {
      return this.text.substring(0, 100) + (this.text.length > 100 ? ' [...]' : '')
    }
  },
  data() {
    return {
      isTextModalShown: false
    }
  },
  methods: {
    hideTextModal() {
      this.isTextModalShown = false
    },
    showTextModal() {
      this.isTextModalShown = true
    }
  },
  created() {
    bus.$on('suggestions-sent', this.hideTextModal)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.text-card {
  .card-base {
    padding: 30px 0;
    .header {
      .author-pseudo {
        color: $primary-color;
      }
      small {
        color: $secondary-color;
      }
    }
    .content {
      padding: 0 20px;
      .text {
        text-align: left;
        max-width: 200px;
      }
      .default-button {
        margin-top: 30px;
      }
    }
  }
}
</style>
