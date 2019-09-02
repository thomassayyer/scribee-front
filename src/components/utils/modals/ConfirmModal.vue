<template>
  <div class="confirm-modal">
    <modal-wrapper>
      <modal-content @close="$emit('close')">
        <h3 slot="header" class="title">{{ question }}</h3>
        <div slot="content" class="content">
          <vertical-container>
            <default-button :color="buttonColor" @click="$emit('submit')">Oui</default-button>
            <default-button @click="$emit('close')">Non</default-button>
          </vertical-container>
        </div>
      </modal-content>
    </modal-wrapper>
  </div>
</template>

<script>
import ModalWrapper from './ModalWrapper'
import ModalContent from './ModalContent'
import VerticalContainer from '@/components/VerticalContainer'
import DefaultButton from '@/components/utils/buttons/DefaultButton'

export default {
  props: {
    question: {
      required: true,
      type: String
    },
    buttonColor: {
      required: false,
      type: String,
      default: 'primary'
    }
  },
  components: {
    ModalWrapper, ModalContent, VerticalContainer, DefaultButton
  }
}
</script>

<style lang="scss" scoped>
.confirm-modal {
  .title {
    font-weight: bold;
  }
}
</style>
