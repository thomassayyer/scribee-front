<template>
  <div class="publish-text-modal">
    <modal-wrapper>
      <modal-content @close="$emit('close')">
        <h3 slot="header" class="title">Publier un de vos textes</h3>
        <form slot="content" @submit.prevent="$emit('submit', text)">
          <search-input placeholder="L'envoyer dans ..." :icon="null" :autocomplete="autocomplete" @select="updateCommunity"/>
          <text-area-input name="text" placeholder="Votre texte ..." v-model.trim="text.text" @keyup="validateText" :wrong="validation.text !== null" :error="validation.text"></text-area-input>
          <default-button :disabled="!isEverythingValid || !isEverythingFilled" color="primary">Publier !</default-button>
        </form>
      </modal-content>
    </modal-wrapper>
  </div>
</template>

<script>
import ModalWrapper from './ModalWrapper'
import ModalContent from './ModalContent'
import SearchInput from '@/components/utils/inputs/SearchInput'
import TextAreaInput from '@/components/utils/inputs/TextAreaInput'
import DefaultButton from '@/components/utils/buttons/DefaultButton'

export default {
  components: {
    ModalWrapper, ModalContent, SearchInput, TextAreaInput, DefaultButton
  },
  data() {
    return {
      text: {
        community: null,
        text: null
      },
      validation: {
        text: null
      }
    }
  },
  computed: {
    isEverythingFilled() {
      return this.text.community && this.text.text
    },
    isEverythingValid() {
      return !this.validation.text
    }
  },
  methods: {
    autocomplete(query) {
      return this.$store.dispatch('autocompleteCommunities', query)
    },
    updateCommunity(pseudo) {
      this.text.community = pseudo;
    },
    validateText() {
      if (this.text.text && this.text.text.length > 40000) {
        this.validation.text = "Votre texte est trop long."
      } else {
        this.validation.text = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.publish-text-modal {
  .title {
    font-weight: bold;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .search-input {
      margin-bottom: 10px;
    }
  }
}
</style>
