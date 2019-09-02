<template>
  <div class="suggestion-modal">
    <modal-wrapper>
      <modal-content @close="$emit('close')">
        <p slot="header" class="original-text">{{ originalText }}</p>
        <form slot="content" @submit.prevent="$emit('submit', suggestion)">
          <text-area-input placeholder="Votre suggestion ..." v-model.trim="suggestion.suggestion"/>
          <default-button color="primary">Envoyer</default-button>
        </form>
      </modal-content>
    </modal-wrapper>
  </div>
</template>

<script>
import ModalWrapper from './ModalWrapper'
import ModalContent from './ModalContent'
import TextAreaInput from '@/components/utils/inputs/TextAreaInput'
import DefaultButton from '@/components/utils/buttons/DefaultButton'

export default {
  props: {
    originalText: {
      required: true,
      type: String
    }
  },
  components: {
    ModalWrapper, ModalContent, TextAreaInput, DefaultButton
  },
  data() {
    return {
      suggestion: {
        original: this.originalText,
        suggestion: this.originalText,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.suggestion-modal {
  .modal-wrapper {
    z-index: 9999;
  }
  .original-text {
    text-decoration: line-through
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
