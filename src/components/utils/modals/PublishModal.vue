<template>
  <div class="publish-modal">
    <modal-wrapper>
      <modal-content @close="$emit('close')">
        <h3 slot="header" class="title">Publier un de vos textes</h3>
        <form slot="content" @submit="$emit('submit', text)">
          <search-input name="community" ref="community" placeholder="L'envoyer dans ..." :icon="null" :autocomplete="autocomplete" @select="updateCommunity"/>
          <text-area-input name="text" ref="text" placeholder="Votre texte ..." v-model="text.text"></text-area-input>
          <submit-button :disabled="!isEverythingFilled" color="primary">Publier !</submit-button>
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
import SubmitButton from '@/components/utils/buttons/SubmitButton'

export default {
  props: {
    size: {
      required: false,
      type: String,
      default: ''
    }
  },
  components: {
    ModalWrapper, ModalContent, SearchInput, TextAreaInput, SubmitButton
  },
  data() {
    return {
      text: {
        community: null,
        text: null
      }
    }
  },
  computed: {
    isEverythingFilled() {
      return this.text.community && this.text.text
    }
  },
  methods: {
    autocomplete(query) {
      return this.$store.dispatch('autocompleteCommunities', query)
    },
    updateCommunity(pseudo) {
      this.text.community = pseudo;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/color.scss';

  .publish-modal {
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
