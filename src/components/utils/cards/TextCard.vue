<template>
  <div class="text-card">
    <card-base>
      <h3 slot="header" class="header">
        {{ author.name }}&nbsp;<span class="author-pseudo">{{ author.pseudo }}</span>
        <br/>
        <small>Dans {{ community.pseudo }}, {{ formattedUpdatedAt }}</small>
      </h3>
      <div slot="content" class="content">
        <p class="text monospace">{{ cutText }}</p>
        <default-button color="primary" @click="$emit('read')">Consulter</default-button>
      </div>
    </card-base>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/fr'
import CardBase from './CardBase'
import DefaultButton from '@/components/utils/buttons/DefaultButton'

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
    }
  },
  components: {
    CardBase, DefaultButton
  },
  computed: {
    formattedUpdatedAt() {
      return moment(this.updatedAt).fromNow()
    },
    cutText() {
      return this.text.substring(0, 100) + (this.text.length > 100 ? ' [...]' : '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.text-card {
  .card-base {
    padding: 30px 0;
    color: $main-color;
    background: white;
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
