<template>
  <div class="text-modal">
    <modal-wrapper>
      <modal-content @close="$emit('close')" size="large">
        <h3 slot="header" class="header">
          {{ author.name }}&nbsp;<span class="author-pseudo">{{ author.pseudo }}</span>
          <br/>
          <small>Dans {{ community.pseudo }}, {{ formattedUpdatedAt }}</small>
        </h3>
        <div slot="content" class="content">
          <p class="text monospace" @mouseup="selectText">{{ text }}</p>
          <default-button color="primary" @click="$emit('send')">Envoyer mes suggestions</default-button>
        </div>
      </modal-content>
    </modal-wrapper>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/fr'
import ModalWrapper from './ModalWrapper'
import ModalContent from './ModalContent'
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
    },
    suggestions: {
      required: true,
      type: Array
    }
  },
  components: {
    ModalWrapper, ModalContent, DefaultButton
  },
  computed: {
    formattedUpdatedAt() {
      return moment(this.updatedAt).fromNow()
    },
    selection() {
      return window.getSelection()
    }
  },
  methods: {
    selectText() {
      if (this.selection.toString()) {
        console.log(this.selection)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.text-modal {
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
      max-width: 600px;
      white-space: pre-line;
      user-select: text;
    }
    .default-button {
      margin-top: 30px;
      margin-bottom: 10px;
    }
  }
}
</style>
