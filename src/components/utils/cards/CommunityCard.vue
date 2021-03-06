<template>
  <div class="community-card">
    <card-base :color="color">
      <h3 slot="header" class="header">
        {{ name }}&nbsp;<span class="pseudo">{{ pseudo }}</span>
        <br/>
        <small>Créée {{ formattedCreatedAt }}</small>
      </h3>
      <div slot="content" class="content">
        <p class="description monospace">{{ cutDescription }}</p>
        <default-button :color="buttonColor" @click="exploreCommunity">Explorer</default-button>
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
    pseudo: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    createdAt: {
      required: true,
      type: Date
    },
    color: {
      required: false,
      type: String,
      default: 'light'
    }
  },
  components: {
    CardBase, DefaultButton
  },
  computed: {
    formattedCreatedAt() {
      return moment(this.createdAt).fromNow()
    },
    cutDescription() {
      return this.description.substring(0, 50) + (this.description.length > 50 ? ' [...]' : '')
    },
    buttonColor() {
      return this.color === 'dark' ? 'white' : 'primary'
    }
  },
  methods: {
    exploreCommunity() {
      this.$router.push({
        name: 'community',
        params: { pseudo: this.pseudo }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.community-card {
  .card-base {
    padding: 30px 0;
    .header {
      .pseudo {
        color: $warning-color;
      }
      small {
        color: $secondary-color;
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
