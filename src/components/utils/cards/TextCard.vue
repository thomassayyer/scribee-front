<template>
  <div class="text-card">
    <card-base>
      <h3 slot="header" class="header">
        <span class="user">{{ author }}</span>
        <br/>
        <small>Dans {{ community }}, {{ formattedTimestamp }}</small>
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
      type: String
    },
    community: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    },
    timestamp: {
      required: true,
      type: Date
    }
  },
  components: {
    CardBase, DefaultButton
  },
  computed: {
    formattedTimestamp() {
      return moment(this.timestamp).fromNow()
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
      .user {
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
