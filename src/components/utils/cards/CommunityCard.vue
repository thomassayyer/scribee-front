<template>
  <div class="community-card">
    <card-base>
      <h3 slot="header" class="header">
        <span class="pseudo">{{ pseudo }}</span>
      </h3>
      <div slot="content" class="content">
        <p class="description monospace">{{ cutDescription }}</p>
        <default-button color="primary" @click="$emit('explore')">Explorer</default-button>
      </div>
    </card-base>
  </div>
</template>

<script>
import CardBase from './CardBase'
import DefaultButton from '@/components/utils/buttons/DefaultButton'

export default {
  props: {
    pseudo: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    }
  },
  components: {
    CardBase, DefaultButton
  },
  computed: {
    cutDescription() {
      return this.description.substring(0, 100) + (this.description.length > 100 ? ' [...]' : '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.community-card {
  .card-base {
    padding: 30px 0;
    color: $main-color;
    background: white;
    .header {
      .pseudo {
        color: $primary-color;
      }
    }
    .content {
      padding: 0 20px;
      .description {
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
